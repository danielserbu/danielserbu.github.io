function toggleMenu() { document.getElementById('navLinks').classList.toggle('active'); }

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 200) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.style.color = link.getAttribute('href').slice(1) === current ? 'var(--accent-green)' : '';
    });
});

function showTab(category) {
    document.querySelectorAll('.writeup-card').forEach(card => {
        card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
    });
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// CV Export Functions
async function downloadPDF() {
    const element = document.getElementById('cvContent');

    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true);
    clone.style.width = '210mm';
    clone.style.minHeight = '297mm';
    clone.style.padding = '20mm';
    clone.style.backgroundColor = '#ffffff';
    clone.style.color = '#000000';

    const opt = {
        margin: 0,
        filename: 'Daniel_Serbu_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            backgroundColor: '#ffffff',
            logging: false,
            width: 794, // A4 width in pixels at 96 DPI
            windowWidth: 794
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
            compress: true
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
        showNotification('Generating PDF...', 'info');
        await html2pdf().set(opt).from(clone).save();
        showNotification('PDF downloaded successfully!');
    } catch (error) {
        console.error('PDF generation error:', error);
        showNotification('Error generating PDF: ' + error.message, 'error');
    }
}

async function downloadWord() {
    try {
        showNotification('Generating Word document...', 'info');

        // Check if docx library is loaded
        if (typeof docx === 'undefined') {
            throw new Error('Word export library not loaded. Please refresh the page and try again.');
        }

        const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } = docx;

        // Create Word document
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    // Header
                    new Paragraph({
                        text: "Daniel Șerbu",
                        heading: HeadingLevel.HEADING_1,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 200 }
                    }),
                    new Paragraph({
                        text: "Penetration Tester & Security Researcher",
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 100 }
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 300 },
                        children: [
                            new TextRun("📍 Galaţi, Romania  |  "),
                            new TextRun("📧 daniel-serbu@outlook.com  |  "),
                            new TextRun("🔗 linkedin.com/in/daniel-serbu")
                        ]
                    }),

                    // Professional Summary
                    new Paragraph({
                        text: "Professional Summary",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 300, after: 200 }
                    }),
                    new Paragraph({
                        text: "Offensive security specialist with 3+ years of experience in penetration testing and cybersecurity. Expert in identifying and exploiting vulnerabilities across web applications, APIs, cloud infrastructure (AWS, Azure, GCP), mobile applications, and Active Directory environments. Proven track record in delivering comprehensive security assessments, developing red team tools, and conducting secure code reviews. Strong foundation in DevSecOps practices with experience in CI/CD security integration, SAST/DAST implementation, and secure-by-design development. Published 12+ technical writeups and maintain curated security resources for the community.",
                        spacing: { after: 300 }
                    }),

                    // Professional Experience
                    new Paragraph({
                        text: "Professional Experience",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 300, after: 200 }
                    }),
                    new Paragraph({
                        text: "Penetration Tester | Oct 2022 - Present",
                        heading: HeadingLevel.HEADING_3,
                        spacing: { after: 100 }
                    }),
                    new Paragraph({
                        text: "PFA (Independent Contractor) • Romania",
                        italics: true,
                        spacing: { after: 100 }
                    }),
                    new Paragraph({
                        text: "• Conduct comprehensive security assessments across web/mobile applications, APIs, and cloud systems",
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        text: "• Perform external reconnaissance, OSINT investigations, exploitation, and lateral movement testing",
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        text: "• Develop custom red team tools and automation scripts to enhance testing efficiency",
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        text: "• Execute secure code reviews identifying critical vulnerabilities before production deployment",
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        text: "• Simulate sophisticated phishing campaigns to test organizational security awareness",
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        text: "• Prepare detailed vulnerability reports with prioritized remediation guidance",
                        spacing: { after: 300 }
                    }),

                    // Technical Skills
                    new Paragraph({
                        text: "Technical Skills",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 300, after: 200 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Web Application Security: ", bold: true }),
                            new TextRun("OWASP Top 10, SQL Injection, XSS, CSRF, SSRF, XXE, Authentication Bypass, Business Logic Vulnerabilities")
                        ],
                        spacing: { after: 100 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Security Tools: ", bold: true }),
                            new TextRun("Burp Suite Pro, Cobalt Strike, Metasploit, Nmap, SQLMap, Nuclei, Ffuf, Hashcat, Impacket")
                        ],
                        spacing: { after: 100 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Cloud Security: ", bold: true }),
                            new TextRun("AWS, Azure, GCP Security Assessment, IAM Analysis, S3 Misconfigurations")
                        ],
                        spacing: { after: 100 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Mobile & API: ", bold: true }),
                            new TextRun("Android/iOS Pentesting, REST/GraphQL, Mobile OWASP, Frida Framework")
                        ],
                        spacing: { after: 100 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "DevSecOps: ", bold: true }),
                            new TextRun("Container Security, Kubernetes, SAST/DAST/SCA, CI/CD Security, Jenkins, Bamboo")
                        ],
                        spacing: { after: 100 }
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Programming: ", bold: true }),
                            new TextRun("Python, PowerShell, JavaScript, C#, Bash, Groovy")
                        ],
                        spacing: { after: 300 }
                    }),

                    // Certifications
                    new Paragraph({
                        text: "Professional Certifications",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 300, after: 200 }
                    }),
                    new Paragraph({
                        text: "• eWPTx - eXtreme Web Application Penetration Tester (INE Security)",
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        text: "• eCPPT - Certified Professional Penetration Tester (INE Security)",
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        text: "• eMAPT - Mobile Application Penetration Tester (INE Security)",
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        text: "• CAPenX - Advanced Azure Penetration Testing (CyberWarfare Labs)",
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        text: "• CCPenX-AWS - Advanced AWS Penetration Testing (CyberWarfare Labs)",
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        text: "• CRTSv2 - Certified Red Team Specialist v2",
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        text: "• CAPT & CIPT - Mobile Security (Mobile Hacking Lab)",
                        spacing: { after: 300 }
                    }),

                    // Education
                    new Paragraph({
                        text: "Education",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 300, after: 200 }
                    }),
                    new Paragraph({
                        text: "Bachelor's Degree in Computer Science",
                        bold: true,
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        text: "Galați \"Lower Danube\" University • 2015 - 2019",
                        spacing: { after: 300 }
                    }),

                    // Languages
                    new Paragraph({
                        text: "Languages",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 300, after: 200 }
                    }),
                    new Paragraph({
                        text: "• Romanian: Native/Bilingual Proficiency",
                        spacing: { after: 50 }
                    }),
                    new Paragraph({
                        text: "• English: Full Professional Proficiency",
                        spacing: { after: 200 }
                    })
                ]
            }]
        });

        // Generate and save
        const blob = await Packer.toBlob(doc);
        saveAs(blob, "Daniel_Serbu_CV.docx");
        showNotification('Word document downloaded successfully!');
    } catch (error) {
        console.error('Word generation error:', error);
        showNotification('Error generating Word document. Please try again.', 'error');
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    let bgColor = 'var(--accent-green)';
    if (type === 'error') bgColor = 'var(--accent-red)';
    if (type === 'info') bgColor = 'var(--accent-cyan)';

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: var(--bg-primary);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, type === 'info' ? 5000 : 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Load profile data from JSON and populate CV
async function loadProfileData() {
    try {
        const response = await fetch('profile-data.json');
        if (!response.ok) {
            console.warn('Could not load profile data, using static content');
            return;
        }
        const data = await response.json();

        // Update CV contact info
        const cvContactInfo = document.querySelector('.cv-contact-info');
        if (cvContactInfo && data.email) {
            const emailItem = cvContactInfo.querySelector('.cv-contact-item:nth-child(2)');
            if (emailItem) emailItem.textContent = `📧 ${data.email}`;
        }

        // Update CV Professional Summary
        const cvSummary = document.querySelector('.cv-summary');
        if (cvSummary && data.summary) {
            cvSummary.textContent = data.summary;
        }

        // Update CV Experience Section
        if (data.experience && data.experience.length > 0) {
            const experienceSection = document.querySelector('.cv-section:has(.cv-experience-item)');
            if (experienceSection) {
                // Remove old experience items
                const oldItems = experienceSection.querySelectorAll('.cv-experience-item');
                oldItems.forEach(item => item.remove());

                // Add new experience items from JSON
                data.experience.forEach(exp => {
                    const expItem = document.createElement('div');
                    expItem.className = 'cv-experience-item';

                    const dateRange = exp.current ?
                        `${exp.startDate} - Present` :
                        `${exp.startDate} - ${exp.endDate}`;

                    const responsibilities = exp.responsibilities
                        .map(resp => `<li>${resp}</li>`)
                        .join('');

                    expItem.innerHTML = `
                        <div class="cv-experience-header">
                            <div class="cv-job-title">${exp.title}</div>
                            <div class="cv-date">${dateRange}</div>
                        </div>
                        <div class="cv-company">${exp.company} • ${exp.location}</div>
                        <div class="cv-description">
                            <ul>${responsibilities}</ul>
                        </div>
                    `;

                    experienceSection.appendChild(expItem);
                });
            }
        }

        console.log('Profile data loaded successfully');
    } catch (error) {
        console.warn('Error loading profile data:', error);
    }
}

// Load profile data when page loads
document.addEventListener('DOMContentLoaded', loadProfileData);
