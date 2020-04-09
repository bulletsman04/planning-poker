using BetterPointingPoker.Server.Web.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BetterPointingPoker.Server.Web.Models
{
    public class User: IUser
    {
 
        public string Id { get; set; }
        public string NickName { get; set; }
        public double? VoteValue { get; set; }
        public bool Voted { get; set; }
        public DateTime LastUpdated { get; set; }

        public User(string nickName, string id)
        {
            NickName = nickName;
            Id = id;
            LastUpdated = DateTime.Now;
        }

        public void Vote(double? vote)
        {
            Voted = true;
            VoteValue = vote;
        }

        public void ClearVote()
        {
            Voted = false;
        }
    }
}
