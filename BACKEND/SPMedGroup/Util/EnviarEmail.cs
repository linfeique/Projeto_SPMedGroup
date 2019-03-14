using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Threading.Tasks;

namespace SpMedGroup.Util
{
    public class EnviarEmail
    {

        public void Execute(string email)
        {
            var client = new SendGridClient("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");
            var from = new EmailAddress("matheuscustodiosantos@hotmail.com", "Example User");
            var subject = "Sending with SendGrid is Fun";
            var to = new EmailAddress(email, "Example User");
            var plainTextContent = "and easy to do anywhere, even with C#";
            var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = client.SendEmailAsync(msg);
        }
    }
}
