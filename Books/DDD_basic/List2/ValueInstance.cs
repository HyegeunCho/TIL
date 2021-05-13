using System;

namespace List2
{
    public class ValueInstance
    {
        public void RunList2()
        {
            // List 2-1
            var fullName = "hyegeun cho";
            Console.WriteLine(fullName);

            // List 2-2
            var tokens = fullName.Split(' ');
            var lastName = tokens[0];
            Console.WriteLine(lastName);
        }

        
    }
}
