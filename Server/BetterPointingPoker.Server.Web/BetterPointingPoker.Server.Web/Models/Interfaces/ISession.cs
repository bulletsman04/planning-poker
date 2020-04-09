using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BetterPointingPoker.Server.Web.Models.Interfaces
{
    public interface ISession
    {
        public IDictionary<string, IUser> Users { get; }
        (bool canJoin, string error) CanJoinSession(string userId);
        (bool joined, string error) JoinSession(string nickname, string userId);
        bool LeaveSession(string userId);
        void Vote(string userId, double? vote);
        void ClearVote(string userId);
        void ClearAllVotes();
        void ShowVotes();
        void KeepAlive(string userId);
    }
}
