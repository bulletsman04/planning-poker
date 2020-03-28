using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace BetterPointingPoker.Server.Web.Hubs
{
    public class StartSessionHub: Hub
    {
        public void CreateSession(string nick)
        {
            Clients.Caller.SendAsync("SessionStarted", "123");
        }
    }
}
