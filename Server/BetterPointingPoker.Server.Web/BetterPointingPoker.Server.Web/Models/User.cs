using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BetterPointingPoker.Server.Web.Models
{
    public class User
    {
 
        public string NickName { get; set; }
        public int? VoteValue { get; set; }
        public bool Voted { get; set; }

        public User(string nickName)
        {
            NickName = nickName;
        }

        public void Vote(int? vote)
        {
            Voted = true;
            VoteValue = vote;
        }
    }
}
