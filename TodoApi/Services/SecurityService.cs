using System.Security.Cryptography;

namespace TodoApi.Services
{
    public static class SecurityService
    {
        public static byte[] HashPassword(byte[] password)
        {
            byte[] hashedPassword;
            using(SHA256 mySha = SHA256.Create())
            {
                hashedPassword = mySha.ComputeHash(password); // computes the hashcode
            }

            return hashedPassword;
        }

        public static bool Authenticate(byte[] inputPassword, byte[] storedPassword)
        {
            for(int i = 0; i < inputPassword.Length; i++)
            {
                if(inputPassword[i] != storedPassword[i]) return false;
            }
            
            return true;
        }
    }
}