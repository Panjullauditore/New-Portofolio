const fs = require('fs');
const path = require('path');

// Simple valid PDF generator
function createResumePDF() {
  const content = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 595.28 841.89]
  /Contents 4 0 R
  /Resources <<
    /Font <<
      /F1 5 0 R
      /F2 6 0 R
    >>
  >>
>>
endobj
4 0 obj
<<
  /Length 1200
>>
stream
BT
/F1 24 Tf
50 780 Td
(AHMAD FAHREZI) Tj
/F2 14 Tf
0 -24 Td
(Fullstack Developer) Tj
/F2 10 Tf
0 -18 Td
(Email: ahmadfahrezir@gmail.com | Portfolio: ahmadfahrezi.dev | GitHub: github.com/ahmadfahrezi) Tj

/F1 14 Tf
0 -32 Td
(SUMMARY) Tj
/F2 10 Tf
0 -18 Td
(Fullstack Developer with 2.5+ years experience building scalable, responsive web applications.) Tj
0 -14 Td
(Specializing in Next.js, React, Node.js, Laravel, TypeScript, and modern UI systems.) Tj

/F1 14 Tf
0 -32 Td
(EXPERIENCE) Tj
/F1 11 Tf
0 -18 Td
(Fullstack Developer - Web & Tech Solutions (2024 - Present)) Tj
/F2 10 Tf
0 -14 Td
(- Developing modern full-stack web applications and robust backend APIs.) Tj
0 -14 Td
(- Improving system performance, database schemas, and user interfaces.) Tj

/F1 11 Tf
0 -22 Td
(Web Developer - Digital Creative Studio (2022 - 2024)) Tj
/F2 10 Tf
0 -14 Td
(- Built responsive web applications and interactive client platforms.) Tj
0 -14 Td
(- Integrated third-party APIs including Spotify, REST endpoints, and databases.) Tj

/F1 14 Tf
0 -32 Td
(SKILLS) Tj
/F2 10 Tf
0 -18 Td
(- Languages & Frameworks: Next.js, React, TypeScript, JavaScript, Laravel, Python, Node.js) Tj
0 -14 Td
(- Databases & Tools: MySQL, Prisma ORM, Git, VS Code, Tailwind CSS, Figma) Tj
0 -14 Td
(- Competencies: Fullstack Architecture, RESTful APIs, Agile/Scrum, Problem Solving) Tj

/F1 14 Tf
0 -32 Td
(EDUCATION) Tj
/F1 11 Tf
0 -18 Td
(Bachelor of Computer Science - Universitas Diponegoro (Undip)) Tj
/F2 10 Tf
0 -14 Td
(Department of Informatics) Tj
ET
endstream
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
6 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000266 00000 n 
0000001518 00000 n 
0000001594 00000 n 
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
1665
%%EOF`;

  const targetPath = path.join(__dirname, '..', 'public', 'CV-Ahmad-Fahrezi-2026.pdf');
  fs.writeFileSync(targetPath, content.trim());
  console.log(`CV PDF created at ${targetPath}`);
}

createResumePDF();
