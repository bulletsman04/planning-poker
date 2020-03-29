using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BetterPointingPoker.Server.Web.Services.Interfaces
{
    public interface ISessionManager
    {
        string CreateSession(string creator);
        (bool canJoin, string error) CanJoinSession(string nickname, string sessionId);
        (bool joined, string error) JoinSession(string nickname, string sessionId);
        bool LeaveSession(string nickname, string sessionId);

    }
}
