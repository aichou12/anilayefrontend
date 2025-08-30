const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SEND_MESSAGE_KEY);

const status = process.env.JOB_STATUS || "unknown";
const subject =
  status === "success"
    ? "✅ Frontend build succeeded on dev"
    : "❌ Frontend build failed on dev";

const body = `
Bonjour l'équipe Anilaye 👋,

Le build Angular 19 sur la branche *dev* a terminé avec le statut : **${status}**.

📌 Repository: ${process.env.GITHUB_REPOSITORY}
📌 Branch: ${process.env.GITHUB_REF}
📌 Commit: ${process.env.GITHUB_SHA}
🔗 Lien: ${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/commit/${process.env.GITHUB_SHA}

--
GitHub Actions 🚀
`;

sgMail
  .send({
    to: [
      "arona010ndiaye@gmail.com",
      "aichasy2188@gmail.com",
      "takkinoyaya@gmail.com",
      "nguiranebabacar305@gmail.com",
      "maladongom104@gmail.com",
    ],
    from: "ahmedmballo7@gmail.com",
    subject: subject,
    text: body,
    html: body.replace(/\n/g, "<br>"),
  })
  .then(() => console.log("✅ Email envoyé !"))
  .catch((err) => console.error("❌ Erreur envoi email:", err));
