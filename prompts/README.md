# Prompts

Every implementation prompt should be documented here.

## Prompt rule

The prompt itself is a fixed instruction for the AI. It should be clear, short, and follow a simple step-by-step flow.

We do not ask for a long text entry in the prompt. We use A/B only for decisions.

A decision is when the agent must choose between two valid approaches. Each option should have a short description, and the recommended option should say why it is better.

## Example

Prompt: Review the login flow and complete the next small step in the workflow until the prompt's Definition of Done is met.

Decision point:
A. Keep the current quick approach
- Short description: faster to build, but less reusable.

B. Recommended: use the structured approach
- Why: clearer, easier to maintain, and safer for future changes.
- Short description: more organized and easier to validate.

The selected path should be followed until that prompt is done, then the next prompt in the linear workflow begins.
