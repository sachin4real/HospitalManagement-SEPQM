describe("Patient Registration Form", () => {
    it("should successfully register a new patient", () => {
      // Visit the Signup page
      cy.visit("http://localhost:3000/signup"); // 🔁 Update the URL as per your React app
  
      // Fill out the form with valid values
      cy.get('input[placeholder="First Name"]').type("Test");
      cy.get('input[placeholder="Last Name"]').type("User");
      cy.get('input[placeholder="Email"]').type("testuser123@example.com");
      cy.get('input[placeholder="Phone No"]').type("0771234567");
      cy.get('input[type="date"]').type("1995-01-01");
      cy.get('select').eq(0).select("Male"); // Gender
      cy.get('select').eq(1).select("Single"); // Civil Status
      cy.get('input[placeholder="Height In cm"]').type("175");
      cy.get('input[placeholder="Weight In Kg"]').type("70");
      cy.get('select').eq(2).select("A+"); // Blood Group
      cy.get('input[placeholder="Medical Status Eg: Cancer Patient"]').type("Healthy");
      cy.get('input[placeholder="Allergies"]').type("None");
      cy.get('input[placeholder="Emergency Contact No"]').type("0777654321");
      cy.get('input[placeholder="Insurance No"]').type("INS123456");
      cy.get('input[placeholder="Insurance Company"]').type("ABC Health");
  
      // Guardian Details
      cy.get('input[placeholder="Guardian Name"]').type("Guardian Name");
      cy.get('input[placeholder="Guardian NIC"]').type("923456789V");
      cy.get('input[placeholder="Guardian Phone"]').type("0778888888");
  
      // Account Information
      cy.get('input[placeholder="Password"]').type("Strong@1234");
      cy.get('input[placeholder="Confirm Password"]').type("Strong@1234");
  
      // Submit form
      cy.get('button[type="submit"]').click();
  
      // Wait for the response and confirm registration
      cy.on("window:alert", (txt) => {
        expect(txt).to.contains("Patient Created");
      });
  
      // Optional: check if QR code appears
      cy.contains("Your QR Code").should("exist");
    });
  });
  




  describe("Patient Registration Form - Invalid Case", () => {
    it("should show validation errors on invalid input", () => {
      cy.visit("http://localhost:3000/signup"); // Adjust if your route differs
  
      // Fill only partial or incorrect data
      cy.get('input[placeholder="First Name"]').type("Invalid");
      cy.get('input[placeholder="Last Name"]').type("User");
      cy.get('input[placeholder="Email"]').type("invalid-email-format");
      cy.get('input[placeholder="Phone No"]').type("0771234567");
      cy.get('input[type="date"]').type("1990-01-01");
      cy.get('select').eq(0).select("Male");
      cy.get('select').eq(1).select("Single");
      cy.get('input[placeholder="Height In cm"]').type("160");
      cy.get('input[placeholder="Weight In Kg"]').type("60");
      cy.get('select').eq(2).select("B+");
      cy.get('input[placeholder="Medical Status Eg: Cancer Patient"]').type("N/A");
      cy.get('input[placeholder="Allergies"]').type("None");
      cy.get('input[placeholder="Emergency Contact No"]').type("0771231234");
      cy.get('input[placeholder="Insurance No"]').type("INS000123");
      cy.get('input[placeholder="Insurance Company"]').type("ABC");
  
      // Guardian Details
      cy.get('input[placeholder="Guardian Name"]').type("John Doe");
      cy.get('input[placeholder="Guardian NIC"]').type("923456789V");
      cy.get('input[placeholder="Guardian Phone"]').type("0779999999");
  
      // Password mismatch
      cy.get('input[placeholder="Password"]').type("Strong@123");
      cy.get('input[placeholder="Confirm Password"]').type("Strong@123");
  
      // Try to submit the form
      cy.get('button[type="submit"]').click();
  
      // Expect alert for invalid email or password mismatch
      cy.on("window:alert", (txt) => {
        expect(txt).to.match(/Invalid Email|Passwords don't match/);
      });
  
      // Ensure QR code is NOT shown
      cy.contains("Your QR Code").should("not.exist");
    });
  });

