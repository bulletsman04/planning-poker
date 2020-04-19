using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BetterPointingPoker.Server.Web.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace BetterPointingPoker.Server.Web.Hubs
{
    public class ManageSessionHub: Hub
    {
        private readonly ISessionManager _sessionManager;

        public ManageSessionHub(ISessionManager sessionManager)
        {
            this._sessionManager = sessionManager;
        }

        public void CreateSession(string creator)
        {
            var id = _sessionManager.CreateSession(creator, Context.ConnectionId);
            Clients.Caller.SendAsync("SessionStarted", id);
        }

        public void JoinSession(string nickname, string sessionId)
        {
            var joinedWithError = _sessionManager.JoinSession(nickname, sessionId, Context.ConnectionId);
            Clients.Caller.SendAsync("JoinSession", joinedWithError.joined, joinedWithError.error);
        }

        public void LeaveSession(string sessionId)
        {
            _sessionManager.LeaveSession(Context.ConnectionId, sessionId);
        }

        public void KeepAlive(string sessionId)
        {
            _sessionManager.KeepAlive(Context.ConnectionId, sessionId);
        }

        public void Vote(string sessionId, double? voteValue)
        {
            _sessionManager.Vote(Context.ConnectionId, sessionId, voteValue);
        }

        public void ShowVotes(string sessionId)
        {
            _sessionManager.ShowVotes(sessionId);
        }

        public void ClearVotes(string sessionId)
        {
            _sessionManager.ClearAllVotes(sessionId);
        }
    }
}
