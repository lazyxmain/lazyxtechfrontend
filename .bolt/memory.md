# Project memory

## Product intent & audience

- Marketing website for LazyXTech, positioned as a tech/creative agency.
- Sections include: animated hero, core services, portfolio showcases, and a contact inquiry system.
- Target audience: potential clients evaluating agency capabilities and aesthetics.

## Brand personality & voice

- Modern, premium, high-tech agency feel.
- Confident and polished; leans into motion and visual sophistication over minimal static layouts.

## Visual design & UX direction

- Light theme throughout.
- Hero centers on a mouse-responsive glowing core orb with orbiting rings, particles, floating glass UI panels, and parallax depth — all built with Framer Motion + CSS (no Three.js).
- Highly animated interactions are expected and valued; motion is a core part of the brand expression.
- Prefer lightweight, dependency-free visual effects over heavy 3D libraries given current React version constraints.

## Decisions, constraints & rationale

- React 18 is the project's current React version; upgrading to React 19 is not assumed.
- `@react-three/fiber` v9 requires React 19, so it was removed to resolve a runtime crash (`Cannot read properties of undefined`). Three.js packages were deleted entirely.
- Hero 3D scene replaced with a custom Framer Motion animated visual to preserve the premium feel without version conflicts.
- Build must pass cleanly with no runtime errors; this is a hard constraint.
- Framer Motion is the primary animation library in use.

## Open questions & assumptions

- Is a future upgrade to React 19 planned to reintroduce real 3D, or is the Framer Motion hero the final direction?
- Specific brand color palette, typography scale, and service/portfolio content details are not yet established.
- Contact inquiry system requirements (form fields, backend handling, validation) are not yet defined.