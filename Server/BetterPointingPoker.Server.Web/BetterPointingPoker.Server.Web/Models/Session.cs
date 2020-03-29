using BetterPointingPoker.Server.Web.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BetterPointingPoker.Server.Web.Models
{
    public class Session : ISession
    {
        private readonly IDictionary<string, User> _users;
        private User _owner;
        public double Average { get; set; }
        public string SessionId { get; set; }

        public Session(string owner, string sessionId)
        {
            _users = new Dictionary<string, User>();
            SessionId = sessionId;
            _owner = new User(owner);
            _users.Add(owner, _owner);
        }

        public (bool joined, string error) JoinSession(string nickname)
        {
            var canJoinWithError = CanJoinSession(nickname);
            if (!canJoinWithError.canJoin)
            {
                return canJoinWithError;
            }

            var newUser = new User(nickname);
            _users.Add(nickname, newUser);

            return (true, null);
        }

        public bool LeaveSession(string nickname)
        {
            bool userExists = _users.ContainsKey(nickname);
            if (!userExists)
            {
                return false;
            }

            _users.Remove(nickname);

            return true;
        }

        public (bool canJoin, string error) CanJoinSession(string nickname)
        {
            bool userAlreadyExists = _users.ContainsKey(nickname);
            if (userAlreadyExists)
            {
                return (false, "User already exists");
            }

            return (true, null);
        }
    }
}
