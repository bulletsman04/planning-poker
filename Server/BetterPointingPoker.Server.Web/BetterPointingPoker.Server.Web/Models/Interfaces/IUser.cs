using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BetterPointingPoker.Server.Web.Models.Interfaces
{
    public interface IUser
    {
        public string Id { get; set; }
        public string NickName { get; set; }
        public double? VoteValue { get; set; }
        public bool Voted { get; set; }
        public DateTime LastUpdated { get; set; }

        public void Vote(double? vote);
        void ClearVote();
    }
}
