# CareQueue Design Documentation

## 🎨 Figma Design Files

**Main Design File:** [CareQueue Design System & Prototype](https://www.figma.com/proto/EsRnBIeQ4fvVjmJAsN7WUQ/CareQueue?node-id=0-1&t=aiyvNc498NoBI8OW-1)

### Access
All team members have view access to the Figma file. If you cannot access the design:
1. Make sure you're logged into Figma with the email you were invited with
2. Check your email for Figma invitation
3. Contact the Product Manager for access

---

## 📱 Key Screens & User Flows

### Patient Journey
1. **Landing Page**
   - Welcome message and CTA
   - Patient check-in option
   - Staff dashboard access

2. **Clinic Selection**
   - Location-based clinic listing
   - Current queue status display
   - Expected wait time

3. **Patient Check-In Form**
   - Full name
   - Phone number
   - Reason for visit
   - New patient indicator

4. **Queue Confirmation**
   - Queue position
   - Estimated wait time
   - SMS confirmation

5. **Queue Status Tracking**
   - Real-time position updates
   - Estimated wait time
   - Notifications

### Staff Dashboard
1. **Staff Login**
   - Secure authentication
   - Role-based access

2. **Queue Management**
   - View all patients in queue
   - Call next patient
   - Update patient status
   - Clinic statistics

---

## 🎨 Design System

### Color Palette

**Primary Colors:**
- Primary Blue: `#0066cc` (Medical Blue)
- Primary Light: `#4d94db`

**Text Colors:**
- White: `#fafafa`
- Black: `#1e1e1e`
- Grey: `#f1f3f6`

**Semantic Colors:**
- Success: `#047857` / Light: `#cafdee`
- Warning: `#d97706` / Light: `#fddab0`
- Error: `#dc2626` / Light: `#f4c5c5`
- Info: `#2563eb` / Light: `#e1eafe`

### Typography

**Heading Font:** Salsa
- H1: 64px (Regular)
- H2: 56px (Regular)
- H3: 48px (Regular)
- H4: 40px (Regular)
- H5: 32px (Regular)
- H6: 24px (Regular)

**Body Font:** Rambla
- Body: 16px (Regular & Bold)
- Caption: 14px (Regular & Bold)

### Spacing System
- Base unit: 4px
- Standard increments: 4px, 8px, 16px, 24px, 32px, 40px, 48px, 56px, 64px, 72px

### Components

**Buttons:**
- Primary (filled)
- Secondary (outlined)
- Tertiary (text only)
- States: Default, Hover, Disabled, Deactivated
- Sizes: Small, Medium, Large

**Status Badges:**
- Confirmed
- Waiting
- In Progress
- Completed

**Alerts:**
- Success
- Warning
- Error
- Info

---

## 🖼️ Design Assets

### Icons & Graphics
All icons and graphics are available in the Figma file for export.

### Image Guidelines
- Use high-quality images
- Maintain 16:9 aspect ratio for hero images
- Optimize for web (compress images)
- Use WebP format when possible

---

## 👨‍💻 For Developers

### Implementation Notes

1. **Design Tokens**
   - Use CSS variables for colors and spacing
   - Reference the design system for consistency
   - Don't hardcode color values

2. **Responsive Design**
   - Mobile-first approach
   - Breakpoints: 640px (mobile), 768px (tablet), 1024px (desktop)
   - Test on multiple screen sizes

3. **Component Library**
   - Build reusable components matching Figma designs
   - Use same naming conventions as Figma
   - Document component props and usage

4. **Accessibility**
   - Follow WCAG 2.1 AA standards
   - Ensure sufficient color contrast
   - Add proper ARIA labels
   - Support keyboard navigation

### Exporting Assets from Figma

1. Select the element in Figma
2. Right-click → Export
3. Choose format (SVG for icons, PNG for images)
4. Use @2x for retina displays

### Getting Design Specs

1. Click on any element in Figma
2. View properties in the right panel
3. Use "Inspect" tab for CSS values
4. Copy exact measurements and styles

---

## 📞 Design Questions?

For design-related questions or clarifications:
1. Check the Figma file comments
2. Ask the Product Manager or Designer
3. Create a GitHub Discussion with the "design" label

---

## 🔄 Design Updates

The Figma file is the single source of truth for design. If designs are updated:
1. Designer will notify team
2. Check Figma for latest version
3. Update implementation accordingly

Last Updated: January 2025
