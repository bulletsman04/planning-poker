using BetterPointingPoker.Server.Web.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BetterPointingPoker.Server.Web.Models
{
    public class Session : ISession
    {
        private IUser _owner;

        public double Average { get; set; }
        public string SessionId { get; set; }
        public bool VotesVisible { get; set; }

        public IDictionary<string, IUser> Users { get; }

        public IEnumerable<IUser> GetUsersList()
        {
            return Users.Values.Select(user => new User
            {
                NickName = user.NickName,
                Voted = user.Voted,
                VoteValue = VotesVisible ? user.VoteValue : null
            });
        }

        public Session(string owner, string sessionId, string userId)
        {
            Users = new Dictionary<string, IUser>();
            SessionId = sessionId;
            _owner = new User(owner, userId);
            Users.Add(userId, _owner);
        }

        public (bool joined, string error) JoinSession(string nickname, string userId)
        {
            var canJoinWithError = CanJoinSession(nickname);
            if (!canJoinWithError.canJoin)
            {
                return canJoinWithError;
            }

            var newUser = new User(nickname, userId);
            Users.Add(userId, newUser);

            return (true, null);
        }

        public bool LeaveSession(string userId)
        {
            bool userExists = Users.ContainsKey(userId);
            if (!userExists)
            {
                return false;
            }

            Users.Remove(userId);

            return true;
        }

        public (bool canJoin, string error) CanJoinSession(string nickname)
        {
            bool userAlreadyExists = Users.Values.Any(user => user.NickName == nickname);
            if (userAlreadyExists)
            {
                return (false, "User already exists");
            }

            return (true, null);
        }

        public void Vote(string userId, double? vote)
        {
            Users[userId].Vote(vote);
            // notify others here or in SessionManager
        }

        public void ClearVote(string userId)
        {
            Users[userId].ClearVote();
            // notify others here or in SessionManager
        }

        public void ClearAllVotes()
        {
            foreach (var user in Users.Values)
            {
                user.ClearVote();
            }
            // notify others here or in SessionManager
        }

        public void ShowVotes()
        {
            // either send here Users-votes dict or return it up
        }

        public void KeepAlive(string userId)
        {
            var user = Users.Values.FirstOrDefault(user => user.Id == userId);
            if (user != null)
            {
                user.LastUpdated = DateTime.Now;
            }
        }
    }
}
