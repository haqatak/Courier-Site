from playwright.sync_api import Page, expect
import time

def test_home_page(page: Page):
    """
    This test verifies that the home page loads correctly and takes a screenshot.
    """
    # 1. Arrange: Go to the application's home page.
    page.goto("http://localhost:5173")

    # Wait for the ion-app element to be visible
    expect(page.locator("ion-app")).to_be_visible()

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png", full_page=True)