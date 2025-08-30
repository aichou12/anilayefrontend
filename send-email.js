const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_MESSAGE_KEY);

const status = process.env.JOB_STATUS || "unknown";
const isSuccess = status === "success";
const subject = isSuccess
  ? "✅ Frontend build succeeded on dev"
  : "❌ Frontend build failed on dev";

const recipients = [
  "ahmedmballo7@gmail.com",
  "arona010ndiaye@gmail.com",
  "aichasy2188@gmail.com",
  "takkinoyaya@gmail.com",
  "nguiranebabacar305@gmail.com",
  "maladongom104@gmail.com",
];

const commitMessage = process.env.COMMIT_MESSAGE || "Pas de message de commit";

const bodyText = `
Bonjour l'équipe Anilaye ,

Le build Angular 19 sur la branche dev a terminé avec le statut : ${status}.

Repository: ${process.env.GITHUB_REPOSITORY}
Branch: ${process.env.GITHUB_REF}
Commit SHA: ${process.env.GITHUB_SHA}
Commit Message: ${commitMessage}
Lien: ${process.env.GITHUB_SERVER_URL}/${
  process.env.GITHUB_REPOSITORY
}/commit/${process.env.GITHUB_SHA}

Destinataires: ${recipients.join(", ")}

Equipe Anilay
`;

const bodyHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin:0; padding:0; }
    .container { width: 100%; max-width: 650px; margin: 20px auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
    .header { padding: 20px; text-align: center; font-size: 22px; font-weight: bold; color: #fff; background-color: ${
      isSuccess ? "#28a745" : "#dc3545"
    }; }
    .content { padding: 25px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { text-align: left; padding: 10px; border-bottom: 1px solid #eee; }
    th { background-color: #f8f9fa; }
    a { color: #1a73e8; text-decoration: none; }
    .footer { padding: 15px; font-size: 12px; text-align: center; color: #777; background: #f1f1f1; }
    .recipients { margin-top: 15px; font-size: 14px; color: #555; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      ${isSuccess ? "✅ Build réussi sur dev" : "❌ Build échoué sur dev"}
    </div>
    <div class="content">
      <p>Bonjour l'équipe Anilaye 👋,</p>
      <p>Le build Angular 19 sur la branche <strong>dev</strong> a terminé avec le statut : <strong>${status}</strong>.</p>
      <table>
        <tr><th>Repository</th><td>${process.env.GITHUB_REPOSITORY}</td></tr>
        <tr><th>Branch</th><td>${process.env.GITHUB_REF}</td></tr>
        <tr><th>Commit SHA</th><td>${process.env.GITHUB_SHA}</td></tr>
        <tr><th>Commit Message</th><td>${commitMessage}</td></tr>
        <tr><th>Lien</th><td><a href="${process.env.GITHUB_SERVER_URL}/${
  process.env.GITHUB_REPOSITORY
}/commit/${process.env.GITHUB_SHA}">Voir le commit</a></td></tr>
      </table>
      <div class="recipients">
        <strong>Destinataires :</strong> ${recipients.join(", ")}
      </div>
    </div>
    <div class="footer">Equipe Anilay'O | Groupe 30 Edacy</div>
  </div>
</body>
</html>
`;

sgMail
  .send({
    to: recipients,
    from: "ahmedmballo7@gmail.com",
    subject: subject,
    text: bodyText,
    html: bodyHtml,
  })
  .then(() => console.log("✅ Email envoyé !"))
  .catch((err) => console.error("❌ Erreur envoi email:", err));
