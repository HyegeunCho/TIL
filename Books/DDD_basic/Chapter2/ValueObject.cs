using System;

namespace Chapter2
{
    public class ValueObject
    {
        public void RunList1()
        {
            Console.WriteLine("\n----- List 2-1 -----");
            // List 2-1
            var fullName = "hyegeun cho";
            Console.WriteLine(fullName);
        }

        public void RunList2()
        {
            Console.WriteLine("\n----- List 2-2 -----");
            var fullName = "hyegeun cho";
            // List 2-2
            var tokens = fullName.Split(' ');
            var lastName = tokens[0];
            Console.WriteLine(lastName);
        }

        public void RunList3()
        {
            Console.WriteLine("\n----- List 2-3 -----");

            var fullName = "john smith";
            var tokens = fullName.Split(' ');
            var lastName = tokens[0];
            Console.WriteLine(lastName);
        }

        public void RunList5()
        {
            Console.WriteLine("\n----- List 2-5 -----");

            var fullName = new FullName("hyegeun", "cho");
            Console.WriteLine(fullName.LastName);
        }

        public void RunList7()
        {
            Console.WriteLine("\n----- List 2-7 -----");

            var greet = "안녕하세요";
            Console.WriteLine(greet);
            greet = "Hello";
            Console.WriteLine(greet);
        }
    }
}
