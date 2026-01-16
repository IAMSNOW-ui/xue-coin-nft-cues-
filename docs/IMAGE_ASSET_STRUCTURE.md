# Image Asset Organization

## Directory Structure

```
assets/
├── components/
│   ├── butt-caps/
│   │   ├── wood/
│   │   │   ├── maple_cap.png
│   │   │   ├── ebony_cap.png
│   │   │   ├── rosewood_cap.png
│   │   │   └── custom_cap.png
│   │   ├── metal/
│   │   │   ├── chrome_cap.png
│   │   │   ├── brass_cap.png
│   │   │   ├── gold_cap.png
│   │   │   └── custom_metal_cap.png
│   │   └── designer/
│   │       ├── dragon_cap.png
│   │       ├── skull_cap.png
│   │       └── logo_cap.png
│   │
│   ├── wraps/
│   │   ├── leather/
│   │   │   ├── black_leather.png
│   │   │   ├── brown_leather.png
│   │   │   └── custom_leather.png
│   │   ├── linen/
│   │   │   ├── white_linen.png
│   │   │   ├── irish_linen.png
│   │   │   └── black_linen.png
│   │   ├── rubber/
│   │   │   ├── black_rubber.png
│   │   │   ├── red_rubber.png
│   │   │   └── blue_rubber.png
│   │   └── no-wrap/
│   │       └── bare_wood.png
│   │
│   ├── forearms/
│   │   ├── maple/
│   │   │   ├── hard_rock_maple.png
│   │   │   ├── birds_eye_maple.png
│   │   │   └── curly_maple.png
│   │   ├── exotic/
│   │   │   ├── ebony.png
│   │   │   ├── rosewood.png
│   │   │   ├── cocobolo.png
│   │   │   ├── zebrawood.png
│   │   │   └── purpleheart.png
│   │   └── ash/
│   │       ├── white_ash.png
│   │       └── flamed_ash.png
│   │
│   ├── joints/
│   │   ├── quick-release/
│   │   │   ├── uni_loc.png
│   │   │   ├── 3_8_10.png
│   │   │   └── radial.png
│   │   ├── traditional/
│   │   │   ├── stainless_steel.png
│   │   │   ├── brass.png
│   │   │   └── wood_to_wood.png
│   │   └── custom/
│   │       └── engraved_joint.png
│   │
│   ├── shafts/
│   │   ├── wood/
│   │   │   ├── hard_rock_maple_shaft.png
│   │   │   ├── low_deflection_maple.png
│   │   │   └── ash_shaft.png
│   │   └── carbon/
│   │       ├── carbon_fiber.png
│   │       └── carbon_composite.png
│   │
│   └── tips/
│       ├── leather/
│       │   ├── soft_leather_tip.png
│       │   ├── medium_leather_tip.png
│       │   └── hard_leather_tip.png
│       ├── synthetic/
│       │   ├── phenolic_tip.png
│       │   └── fiber_tip.png
│       └── ferrules/
│           ├── white_ferrule.png
│           ├── black_ferrule.png
│           ├── ivory_ferrule.png
│           └── carbon_ferrule.png
│
├── textures/
│   ├── wood-grains/
│   │   ├── maple_texture.png
│   │   ├── ebony_texture.png
│   │   ├── rosewood_texture.png
│   │   └── ash_texture.png
│   ├── metal-finishes/
│   │   ├── chrome_finish.png
│   │   ├── brass_finish.png
│   │   ├── brushed_steel.png
│   │   └── gold_finish.png
│   ├── wrap-materials/
│   │   ├── leather_grain.png
│   │   ├── linen_weave.png
│   │   └── rubber_pattern.png
│   └── carbon-fiber/
│       └── carbon_weave.png
│
├── ui/
│   ├── panels/
│   │   ├── panel_empty.png
│   │   ├── panel_selected.png
│   │   └── panel_highlight.png
│   ├── buttons/
│   │   ├── select_material.png
│   │   ├── back.png
│   │   ├── next.png
│   │   └── purchase.png
│   └── transitions/
│       ├── merge_flash.png
│       └── merge_animation_frames/
│
└── final-renders/
    └── [dynamically generated merged cues]
```

## Image Specifications

### Component Panel Images
- **Resolution:** 1024 x 512 pixels
- **Format:** PNG (supports transparency)
- **Color Mode:** RGBA
- **Aspect Ratio:** 2:1 (horizontal)
- **File Size Target:** < 500KB per image

### Final Merged Cue Image
- **Resolution:** 1024 x 3072 pixels (6x panel height)
- **Format:** PNG
- **Color Mode:** RGBA
- **Aspect Ratio:** 1:3 (vertical)
- **File Size Target:** < 2MB

### Texture Overlays
- **Resolution:** 2048 x 2048 pixels (high-res for tiling)
- **Format:** PNG with alpha channel
- **Purpose:** Seamless material textures for procedural generation

## Naming Conventions

### Component Images
```
[component]_[material]_[variant].png

Examples:
butt-cap_ebony_standard.png
wrap_leather_black.png
forearm_maple_birds-eye.png
joint_brass_engraved.png
shaft_carbon_fiber.png
tip_leather_medium.png
```

### Material Categories
```
[category]_[type]_[finish].png

Examples:
wood_maple_natural.png
metal_chrome_polished.png
wrap_linen_irish.png
```

## Material Rarity Tiers

### Common (60% drop rate)
- Basic maple woods
- Standard leather wraps
- Stainless steel joints
- Basic leather tips

### Uncommon (25% drop rate)
- Ash and curly maple
- Irish linen wraps
- Brass joints
- Carbon fiber shafts

### Rare (10% drop rate)
- Exotic woods (ebony, rosewood)
- Custom leather wraps
- Engraved joints
- Phenolic tips

### Epic (4% drop rate)
- Purpleheart, zebrawood
- Designer wraps
- Quick-release joints
- Custom ferrules

### Legendary (1% drop rate)
- Custom designer caps
- Limited edition materials
- Unique joint engravings
- Signature pro designs

## Image Loading Strategy

### On Page Load
1. Load UI framework images
2. Preload common material thumbnails
3. Lazy load other materials as user navigates

### During Selection
1. Display low-res preview immediately
2. Load high-res image in background
3. Swap when fully loaded for smooth experience

### For Final Merge
1. Composite high-res component images
2. Apply filters/effects if needed
3. Generate final image
4. Upload to IPFS
5. Store CID in NFT metadata

## CDN Organization

**Development:**
- Host on Vercel static assets
- Path: `/public/assets/`

**Production:**
- Primary: IPFS for immutability
- Fallback: Cloudflare CDN for speed
- Cache: Browser localStorage for frequently accessed materials

## Future Image Enhancements

1. **Dynamic Lighting:** Real-time 3D material rendering
2. **Color Variations:** User-selected tints and finishes
3. **Animations:** Rotating preview of assembled cue
4. **AR Preview:** View cue in real-world environment
5. **Customization Tools:** Upload custom logos/designs
