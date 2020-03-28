using BetterPointingPoker.Server.Web.Models;
using BetterPointingPoker.Server.Web.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BetterPointingPoker.Server.Web.Services
{
    public class SessionManager : ISessionManager
    {
        public IDictionary<string, Session> Sessions { get; set; }

        public SessionManager()
        {
            Sessions = new Dictionary<string, Session>();
        }

        public string CreateSession(string creator)
        {
            Guid guid = Guid.NewGuid();
            var id = guid.ToString().Split('-')[0];
            var session = new Session(creator, id);
            Sessions.Add(id, session);

            return id;
        }

        public bool JoinSession(string nickname, string sessionId)
        {
            var session = Sessions[sessionId];
            var result = session.JoinSession(nickname);

            return result;
        }

        public bool LeaveSession(string nickname, string sessionId)
        {
            var session = Sessions[sessionId];
            var result = session.LeaveSession(nickname);

            return result;
        }
    }
}
