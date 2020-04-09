using BetterPointingPoker.Server.Web.Hubs;
using BetterPointingPoker.Server.Web.Models;
using BetterPointingPoker.Server.Web.Models.Interfaces;
using BetterPointingPoker.Server.Web.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BetterPointingPoker.Server.Web.Services
{
    public class SessionManager : ISessionManager
    {
        public IDictionary<string, ISession> Sessions { get; set; }
        private readonly IHubContext<ManageSessionHub> _manageSessionHub;
        private readonly TimeSpan _maxAfkTime = TimeSpan.FromSeconds(11);

        public SessionManager(IHubContext<ManageSessionHub> manageSessionHub)
        {
            Sessions = new Dictionary<string, ISession>();
            _manageSessionHub = manageSessionHub;
        }

        public string CreateSession(string creator, string userId)
        {
            Guid guid = Guid.NewGuid();
            var id = guid.ToString().Split('-')[0];
            var session = new Session(creator, id, userId);
            Sessions.Add(id, session);

            return id;
        }

        public (bool joined, string error) JoinSession(string nickname, string sessionId, string userId)
        {
            var canJoinWithError = CanJoinSession(nickname, sessionId);
            if (!canJoinWithError.canJoin)
            {
                return canJoinWithError;
            }

            var session = Sessions[sessionId];
            var result = session.JoinSession(nickname, userId);

            foreach (var user in session.Users.Values)
            {
                _manageSessionHub.Clients.Client(user.Id).SendAsync("UserJoined", session.GetUsersList());
            }

            return result;
        }

        public bool LeaveSession(string userId, string sessionId)
        {
            bool sessionExists = Sessions.ContainsKey(sessionId);
            if (!sessionExists)
            {
                return false;
            }


            var session = Sessions[sessionId];
            var result = session.LeaveSession(userId);

            foreach (var user in session.Users.Values)
            {
                _manageSessionHub.Clients.Client(user.Id).SendAsync("SessionInfo", session.GetUsersList());
            }


            return result;
        }

        public (bool canJoin, string error) CanJoinSession(string userId, string sessionId)
        {
            bool sessionExists = Sessions.ContainsKey(sessionId);
            if (!sessionExists)
            {
                return (false, $"Session with id {sessionId} does not exist");
            }

            var canJoin = Sessions[sessionId].CanJoinSession(userId);

            return canJoin;
        }

        public void Vote(string userId, string sessionId, double? vote)
        {
            bool sessionExists = Sessions.ContainsKey(sessionId);
            if (sessionExists)
            {
                var session = Sessions[sessionId];
                session.Vote(userId, vote);
            }
        }

        public void ClearVote(string userId, string sessionId)
        {
            bool sessionExists = Sessions.ContainsKey(sessionId);
            if (sessionExists)
            {
                var session = Sessions[sessionId];
                session.ClearVote(userId);
            }
        }

        public void ClearAllVotes(string sessionId)
        {
            bool sessionExists = Sessions.ContainsKey(sessionId);
            if (sessionExists)
            {
                var session = Sessions[sessionId];
                session.ClearAllVotes();
            }
        }

        public void ShowVotes(string sessionId)
        {
            bool sessionExists = Sessions.ContainsKey(sessionId);
            if (sessionExists)
            {
                var session = Sessions[sessionId];
                session.ShowVotes();
            }
        }

        public void HideVotes(string sessionId)
        {
            // send info to hide votes (but need users here...)
        }

        public object GetSessionInfo(string sessionId)
        {
            bool sessionExists = Sessions.ContainsKey(sessionId);
            if (!sessionExists)
            {
                return null;
            }
            var session = Sessions[sessionId];

            return session.GetUsersList();
        }

        public void KeepAlive(string userId, string sessionId)
        {

            bool sessionExists = Sessions.ContainsKey(sessionId);
            if (sessionExists)
            {
                var session = Sessions[sessionId];
                session.KeepAlive(userId);

                bool needToUpdate = false;

                foreach (var user in session.Users.Values)
                {
                   
                   if(DateTime.Now - user.LastUpdated > _maxAfkTime)
                    {
                        needToUpdate = true;
                        session.LeaveSession(user.Id);
                    }
                }

                if (needToUpdate)
                {

                    foreach (var user in session.Users.Values)
                    {
                        _manageSessionHub.Clients.Client(user.Id).SendAsync("SessionInfo", session.GetUsersList());
                    }
                }
            }
        }
    }
}
