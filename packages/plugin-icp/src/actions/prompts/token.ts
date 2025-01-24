export const createTokenTemplate = `Extract token information from these recent messages and generate creative values for a new meme token on PickPump:

Recent conversation context:
{{recentMessages}}

First, carefully analyze the conversation above to:
1. Extract any existing token name and symbol if explicitly mentioned
2. Extract the latest token idea or description

Then generate the token information following these rules:
- If a token name is found in the messages, use it exactly as mentioned
- If a token symbol is found in the messages, use it exactly as mentioned (must be 2-6 letters)
- If name or symbol are not found, create new ones based on the latest token idea
- Generate an engaging description based on the extracted token idea/theme

Generate:
1. Token name: Use existing from messages or create a catchy new one that reflects the theme
2. Symbol: Use existing from messages or create a 2-6 letter symbol (all caps). If extracted symbol is longer than 6 letters, create a new appropriate symbol
3. An engaging and humorous description based on the extracted token idea. Make it memorable using elements like:
   - Clever wordplay related to the token's theme
   - Relevant cultural references
   - Humor that matches the token's concept
   - Optional emojis that fit naturally
   Style examples for reference:
   - "Much wow! Such gains! The first Doge-approved token for rocket science!"
   - "In a world where tokens come and go, one meme dared to be different"
   - "Not your grandma's token, unless your grandma is really into experimental physics"
   - "Turning coffee into code since 2024. Side effects may include spontaneous wealth"
   - "The token that puts the 'fun' in fungible and the 'able' in unstable"

4. Principal ID (pid) should be extracted from the recent messages if provided (format: "j6jni-euxrr-7s6ef-vb2wt-dovvi-u7772-a6exj-kdhru-swdod-q3w44-uae"), otherwise set to null
5. Set other fields to null

Example response:
\`\`\`json
{
    "name": "CatLaser",
    "symbol": "LASER",
    "description": "The first token powered by feline laser-chasing energy. Warning: May cause sudden urges to invest in red dot technology",
    "logo": null,
    "website": null,
    "twitter": null,
    "telegram": null,
    "pid": "j6jni-euxrr-7s6ef-vb2wt-dovvi-u7772-a6exj-kdhru-swdod-q3w44-uae"
}
\`\`\`

Generate appropriate meme token information based on the extracted information and latest idea.
Respond with a JSON markdown block containing only the generated values.`;

export const logoPromptTemplate = (basePrompt: string) =>
    `Create a crypto meme token logo:
	- Concept: ${basePrompt}
	- NO text/words, numbers, copyrighted elements, or generic crypto symbols
	- Design MUST fill entire square canvas edge-to-edge
	- NO small centered icons with empty backgrounds
	- NO floating logos or badges
	- The main design should be the full composition itself
	- 3-4 colors using:
		* Two main colors + one accent
		* Split complementary scheme
		* Analogous with contrast
	- Must be clear at all sizes
	- Works on light/dark backgrounds

	Style Guide (choose most appropriate):
	For animals/creatures:
	- Cute/friendly → Full-frame Pixel Art character/element
	- Bold/memorable → Edge-to-edge Pop Art design
	- Natural → Complete canvas illustration
	- Fierce → Full-coverage Cyberpunk design

	For tech/future:
	- Professional → 3D Modern (glossy, dimensional)
	- Disruptive → Neo Brutalism (bold, high contrast)
	- Futuristic → Synthwave (neon grid, retro-future)
	- Abstract → Crypto-Abstract (nodes, tech patterns)

	For memes/culture:
	- Internet culture → Vaporwave (retro-future, glitch)
	- Gaming → Pixel Art/Retro Console
	- Pop culture → Pop Art (bold, iconic)

	For abstract concepts:
	- Complex → Sacred Geometry (symmetrical patterns)
	- Simple → Minimalist (clean shapes)
	- Dynamic → Abstract Motion (flowing elements)
	- Smooth → Gradient & Glass (transitions, depth)

	Keep it crypto-relevant, unique, and memorable. Avoid corporate looks, complex illustrations, and photorealism.

	Important: Create a cohesive design that extends to the edges of the canvas. Think of it as a complete illustration rather than a logo with background. The subject matter should be integrated into the entire space, not floating or centered with empty space.`;
