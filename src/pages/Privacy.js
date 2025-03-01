import React from "react";
import "./Privacy.css";

function Privacy() {
    return (
        <div className="privacyContainer">
            <h1 className="privacyH1">Privacy Policy</h1>
            <p className="privacyP"><strong>Last Updated: March 01, 2025</strong></p>
            
            <h2 className="privacyH2">We value your privacy. Here’s how we handle data related to multifamilycalc.com:</h2>
            <h3 className="privacyH3">No Personal Data Collection</h3>
            <p className="privacyP">Our multifamily calculator does not collect or store any personal information you input, such as property values or NOI calculations. All computations happen locally on your device.</p>
            
            <h3>Google AdSense</h3>
            <p className="privacyP">We use Google AdSense to display ads on our site. Google and its partners may use cookies or similar technologies to serve personalized ads based on your browsing behavior. This data collection is managed by Google, not us. For more details, see Google’s Privacy Policy and learn how to opt out of personalized ads.</p>
            
            <h3 className="privacyH3">Questions?</h3>
            <p className="privacyP">If you have concerns about privacy, contact us at <a className="privacyA" href="mailto:vendingcactus@gmail.com">vendingcactus@gmail.com</a></p>
            
            <h2 className="privacyH2">Liability Disclaimer</h2>
            <p className="privacyP">The multifamily calculator is a tool for informational purposes only. While we aim to provide accurate estimates for property values, net operating income (NOI), and related metrics, we make no guarantees about the results:</p>
            
            <h3 className="privacyH3">No Liability for Errors</h3>
            <p className="privacyP">We are not responsible for any inaccuracies, errors, or omissions in the calculator’s outputs. Real estate investments involve risks, and our tool is not a substitute for professional financial or legal advice.</p>
            
            <h3 className="privacyH3">Investment Decisions</h3>
            <p className="privacyP">Our website is limited to and intended solely for educational purposes, offering quick numbers for hypothetical real estate scenarios. Do not use this website for investment decisions, as doing so will result in significant financial loss.</p>
            
            <h3 className="privacyH3">Use at Your Own Risk</h3>
            <p className="privacyP">By using this tool, you agree that multifamilycalc.com and its creators bear no responsibility for your use of the information provided.</p>
            
            <h2 className="privacyH2">Content</h2>
            <p className="privacyP">If you find information or calculation results on the website that you believe to be in error, please contact us at <a className="privacyA" href="mailto:vendingcactus@gmail.com">vendingcactus@gmail.com</a> with the specifics, and we will investigate the matter. Where allowed by our data source, we will update the information. That said, we stand behind the quality of our calculator. It’s built to deliver reliable estimates for property values, NOI, and related metrics based on the data you provide. We’re confident it’s a solid starting point for your multifamily analysis—just pair it with expert advice for the full picture.</p>
            
            <h2 className="privacyH2">Changes to This Privacy Policy</h2>
            <p className="privacyP">We reserve the right to update this privacy policy with or without notice. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.</p>
            
            <p className="privacyP"><strong>For professional guidance, consult a qualified real estate or financial advisor.</strong></p>
        </div>
    );
}

export default Privacy;
