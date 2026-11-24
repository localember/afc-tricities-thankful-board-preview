# AFC Tri-Cities thankful board: design preview

Design preview, not live. Clickable mockup only (client side, localStorage + BroadcastChannel). No forms post anywhere, no backend. Pages are noindex and robots.txt disallows all.

- index.html: hub
- patient/: handwriting pad + type instead
- staff/: approve / edit / decline, monthly theme switcher
- tv/: 1920x1080 display, turkey feathers fill as notes are approved

Sample notes are labeled "Sample" and are not from real patients.

TV view (Nov 24, 2026): opens showing the turkey with the 6 sample notes as feathers, each with its words on the feather, and the count in the header. Each note staff approves adds another feather. Add ?demo=N to /tv/ to preview N sample feathers without changing saved notes; ?demo=0 shows the turkey alone.
