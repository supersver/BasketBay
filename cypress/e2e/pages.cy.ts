describe("BasketBay pages", () => {
  it("shows the landing page and opens the login page", () => {
    cy.visit("/");

    cy.contains("BasketBay").should("be.visible");
    cy.contains("Simple shopping for everyday products.").should("be.visible");
    cy.contains("button", "Continue").should("be.visible").click();

    cy.location("pathname").should("eq", "/auth/login");
    cy.contains("h2", "Welcome!").should("be.visible");
    cy.get("input#email").should("be.visible");
    cy.get("input#password").should("be.visible");
    cy.contains("button", "Sign in").should("be.disabled");
  });

  it("shows the login page directly and toggles the submit state", () => {
    cy.visit("/auth/login");

    cy.contains("BasketBay").should("be.visible");
    cy.contains("Sign in to your account").should("be.visible");
    cy.get("input#email").should("have.attr", "type", "email");
    cy.get("input#password").should("have.attr", "type", "password");

    cy.get("input#email").type("tester@example.com");
    cy.get("input#password").type("password123");
    cy.contains("button", "Sign in").should("not.be.disabled");
  });

  it("redirects unauthenticated users from protected routes", () => {
    cy.clearLocalStorage("basketbay_accessToken");

    cy.visit("/app", { failOnStatusCode: false });

    cy.location("pathname").should("eq", "/");
    cy.contains("Simple shopping for everyday products.").should("be.visible");
  });

  it("loads protected app pages when authenticated", () => {
    cy.intercept("GET", "**/v1/auth/profile", {
      body: { name: "Test User", email: "test@example.com", avatar: "" },
    }).as("getProfile");

    cy.intercept("GET", "**/v1/products/**", {
      body: [],
    }).as("getProducts");

    cy.visit("/app", {
      onBeforeLoad(win) {
        win.localStorage.setItem("basketbay_accessToken", "fake-token");
      },
    });

    cy.wait(["@getProfile", "@getProducts"]);
    cy.contains("Products").should("be.visible");
  });

  it("shows the protected cart route when authenticated", () => {
    cy.intercept("GET", "**/v1/auth/profile", {
      body: { name: "Test User", email: "test@example.com", avatar: "" },
    });

    cy.visit("/app/cart", {
      onBeforeLoad(win) {
        win.localStorage.setItem("basketbay_accessToken", "fake-token");
      },
    });

    cy.contains("Your Cart").should("be.visible");
    cy.contains("Your cart is empty.").should("be.visible");
  });

  it("shows the 404 page for an unknown route", () => {
    cy.visit("/unknown-route", { failOnStatusCode: false });

    cy.contains("404 - Page Not Found").should("be.visible");
  });
});
