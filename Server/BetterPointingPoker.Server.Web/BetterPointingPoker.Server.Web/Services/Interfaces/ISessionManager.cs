using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BetterPointingPoker.Server.Web.Services.Interfaces
{
    public interface ISessionManager
    {
        string CreateSession(string creator, string userId);
        (bool canJoin, string error) CanJoinSession(string nickname, string sessionId);
        (bool joined, string error) JoinSession(string nickname, string sessionId, string userId);
        bool LeaveSession(string userId, string sessionId);
        void Vote(string userId, string sessionId, double? vote);
        object GetSessionInfo(string sessionId);
        void ClearVote(string userId, string sessionId);
        void ClearAllVotes(string sessionId);
        void ShowVotes(string sessionId);
        void HideVotes(string sessionId);
        void KeepAlive(string userId, string sessionId);
    }
}
