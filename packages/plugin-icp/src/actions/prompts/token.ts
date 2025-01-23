export const createTokenTemplate = `Based on the user's description, generate creative and memorable values for a new meme token on PickPump:

User's idea: "{{recentMessages}}"

Please generate:
1. A catchy and fun token name that reflects the theme
2. A 3-4 letter symbol based on the name (all caps)
3. An engaging and humorous description (include emojis)
4. Principal ID (pid) should be extracted from the recent messages if provided (format: "j6jni-euxrr-7s6ef-vb2wt-dovvi-u7772-a6exj-kdhru-swdod-q3w44-uae"), otherwise set to null
5. Set other fields to null

Example response:
\`\`\`json
{
    "name": "CatLaser",
    "symbol": "PAWS",
    "description": "The first meme token powered by feline laser-chasing energy! Watch your investment zoom around like a red dot! 😺🔴✨",
    "logo": null,
    "website": null,
    "twitter": null,
    "telegram": null,
    "pid": "j6jni-euxrr-7s6ef-vb2wt-dovvi-u7772-a6exj-kdhru-swdod-q3w44-uae"
}
\`\`\`

Generate appropriate meme token information based on the user's description.
Respond with a JSON markdown block containing only the generated values.`;

export const logoPromptTemplate = (basePrompt: string) =>
    `Create a crypto meme token logo:
	- Concept: ${basePrompt}
	- NO text/words, numbers, copyrighted elements, or generic crypto symbols
	- Square format, centered composition
	- Highly detailed
	- 3-4 main colors maximum
	- Must be clear at all sizes
	- Works on light/dark backgrounds

	Style Guide (choose most appropriate):
	For animals/creatures:
	- Cute/friendly → Pixel Art (8-bit, limited palette)
	- Bold/memorable → Pop Art (comic style, vibrant)
	- Natural → Hand Drawn (organic, textured)
	- Fierce → Cyberpunk (neon, tech elements)

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

	Keep it crypto-relevant, unique, and memorable. Avoid corporate looks, complex illustrations, and photorealism.`;
