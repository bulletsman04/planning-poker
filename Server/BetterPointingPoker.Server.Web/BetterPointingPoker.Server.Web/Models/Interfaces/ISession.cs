using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BetterPointingPoker.Server.Web.Models.Interfaces
{
    public interface ISession
    {
        (bool canJoin, string error) CanJoinSession(string nickname);
        (bool joined, string error) JoinSession(string nickname);
        bool LeaveSession(string nickname);
    }
}
