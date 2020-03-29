using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BetterPointingPoker.Server.Web.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace BetterPointingPoker.Server.Web.Hubs
{
    public class StartSessionHub: Hub
    {
        private readonly ISessionManager _sessionManager;

        public StartSessionHub(ISessionManager sessionManager)
        {
            this._sessionManager = sessionManager;
        }

        public void CreateSession(string creator)
        {
            var id = _sessionManager.CreateSession(creator);
            Clients.Caller.SendAsync("SessionStarted", id);
        }

        public void CanJoinSession(string nickname, string sessionId)
        {
            var canJoinWithError = _sessionManager.CanJoinSession(nickname, sessionId);
            Clients.Caller.SendAsync("CanJoin", canJoinWithError.canJoin, canJoinWithError.error);
        }

        public void JoinSession(string nickname, string sessionId)
        {
            var joinedWithError = _sessionManager.JoinSession(nickname, sessionId);
            Clients.Caller.SendAsync("JoinSession", joinedWithError.joined, joinedWithError.error);
        }
    }
}
