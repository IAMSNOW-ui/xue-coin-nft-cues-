# NFT Cue Stick Guided Build Flow

## Overview
The NFT Cue Stick Builder is a 6-step guided creation process where users select materials for each component of their custom pool cue. Upon completion, the 6 component panels merge into a single, unified cue stick NFT.

## Build Process Flow

### Phase 1: Component Selection (6 Panels)

Users progress through 6 sequential steps, selecting materials for each component:

1. **Butt Cap** - The end piece of the cue
   - Materials: Wood, Metal, Custom designs
   - Display: Panel 1 (Bottom)

2. **Butt Wrap/Sleeve** - Grip area material
   - Materials: Leather, Linen, Irish Linen, Rubber, No Wrap
   - Display: Panel 2

3. **Forearm** - Main butt section wood
   - Materials: Maple, Ash, Ebony, Rosewood, Cocobolo, Custom
   - Display: Panel 3

4. **Joint/Collar** - Connection point between butt and shaft
   - Materials: Stainless Steel, Brass, Radial, Wood-to-Wood, Quick Release
   - Display: Panel 4

5. **Shaft** - Playing shaft material
   - Materials: Hard Rock Maple, Carbon Fiber, Low Deflection Wood
   - Display: Panel 5

6. **Tip/Ferrule** - Playing tip and ferrule combination
   - Materials: Leather (soft/medium/hard), Phenolic, Fiber, Ferrule types
   - Display: Panel 6 (Top)

### Phase 2: Preview Layout

**6-Panel Grid Display:**
```
┌─────────────────────┐
│   Panel 6: Tip      │  ← Top of cue
├─────────────────────┤
│   Panel 5: Shaft    │
├─────────────────────┤
│   Panel 4: Joint    │
├─────────────────────┤
│   Panel 3: Forearm  │
├─────────────────────┤
│   Panel 2: Wrap     │
├─────────────────────┤
│   Panel 1: Butt Cap │  ← Bottom of cue
└─────────────────────┘
```

**Key Features:**
- Each panel updates in real-time as materials are selected
- Users can navigate back to modify any component
- Preview shows texture/color of selected material
- Component name and material choice displayed on each panel

### Phase 3: Purchase & Merge Animation

**Purchase Confirmation:**
1. User reviews complete 6-panel configuration
2. Price displayed based on rarity of selected materials
3. Purchase button triggers blockchain transaction

**Merge Animation:**
1. Screen flash/transition effect
2. 6 panels collapse vertically
3. Panels merge seamlessly into single long box
4. Final composite image renders

**Final Display:**
```
┌────────────────────────────────────────┐
│                                        │
│    Complete Custom Cue Stick NFT      │
│                                        │
│  [Full-length merged cue stick image] │
│                                        │
└────────────────────────────────────────┘
```

**Box Dimensions:**
- Same height as the combined 6 panels
- Single continuous image showing complete cue stick
- All selected materials seamlessly integrated

### Phase 4: NFT Minting

**Metadata Generation:**
```json
{
  "name": "Custom Cue #[ID]",
  "description": "Player-designed NFT Pool Cue",
  "image": "ipfs://[CID]/final-cue.png",
  "attributes": [
    {"trait_type": "Butt Cap", "value": "[selected_material]"},
    {"trait_type": "Wrap", "value": "[selected_material]"},
    {"trait_type": "Forearm", "value": "[selected_material]"},
    {"trait_type": "Joint", "value": "[selected_material]"},
    {"trait_type": "Shaft", "value": "[selected_material]"},
    {"trait_type": "Tip", "value": "[selected_material]"},
    {"trait_type": "Rarity Score", "value": "[calculated_score]"},
    {"trait_type": "Build Date", "value": "[timestamp]"}
  ],
  "components": {
    "butt_cap": "ipfs://[component_1_cid]",
    "wrap": "ipfs://[component_2_cid]",
    "forearm": "ipfs://[component_3_cid]",
    "joint": "ipfs://[component_4_cid]",
    "shaft": "ipfs://[component_5_cid]",
    "tip": "ipfs://[component_6_cid]"
  }
}
```

## Technical Implementation Notes

### Image Requirements
- **Component Images:** 1024x512px per panel
- **Final Merged Image:** 1024x3072px (6x panel height)
- **Format:** PNG with transparency where applicable
- **Naming Convention:** `[component]_[material]_[variant].png`

### State Management
```javascript
const builderState = {
  step: 1, // Current step (1-6)
  selections: {
    buttCap: null,
    wrap: null,
    forearm: null,
    joint: null,
    shaft: null,
    tip: null
  },
  previewImages: [], // Array of 6 component images
  finalImage: null // Merged composite image
}
```

### User Flow States
1. **SELECTING** - User choosing materials for current step
2. **PREVIEW** - All 6 panels displayed with selections
3. **CONFIRMING** - Purchase confirmation screen
4. **MERGING** - Animation/transition in progress
5. **COMPLETE** - Final NFT displayed
6. **MINTED** - NFT minted and ready for use/staking

## Game Integration

**In-Game Use:**
- Completed NFT cue can be equipped in pool games
- Stats derived from component rarity
- Visual appearance matches selected materials

**Staking:**
- Stake cue to earn XueCoin rewards
- Rarer material combinations yield higher APY
- Staked cues can still be displayed in profile

## Future Enhancements

- Custom color tinting for materials
- Limited edition seasonal materials
- Collaborative cues (multiple owners)
- Cue evolution/upgrade system
- Material trading marketplace
