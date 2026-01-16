# NFT Cue Stick Builder - Technical Specifications

## System Architecture

### Frontend Stack
- **Framework:** React/Next.js (Vercel deployment)
- **State Management:** React Context API + Zustand
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Web3:** ethers.js / wagmi

### Backend Services
- **Hosting:** Vercel (serverless functions)
- **Image Processing:** Sharp.js (server-side compositing)
- **Storage:** IPFS (Pinata or NFT.Storage)
- **Database:** Supabase or Firebase (user selections, analytics)

### Smart Contracts
- **Blockchain:** Ethereum L2 (Polygon, Arbitrum) or custom chain
- **Standard:** ERC-721 (NFT)
- **Metadata:** ERC-721 Metadata JSON Schema

## Component Breakdown

### 1. Material Selection Interface

**ComponentSelector.jsx**
```javascript
import { useState } from 'react'
import { motion } from 'framer-motion'

const ComponentSelector = ({ component, materials, onSelect }) => {
  const [selected, setSelected] = useState(null)
  
  return (
    <div className="material-selector">
      <h2>Select {component.name}</h2>
      <div className="materials-grid">
        {materials.map(material => (
          <MaterialCard 
            key={material.id}
            material={material}
            isSelected={selected === material.id}
            onClick={() => {
              setSelected(material.id)
              onSelect(material)
            }}
          />
        ))}
      </div>
    </div>
  )
}
```

### 2. Panel Preview System

**PanelPreview.jsx**
```javascript
const PanelPreview = ({ components }) => {
  return (
    <div className="panel-container">
      {components.map((component, index) => (
        <motion.div 
          key={index}
          className="panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <img 
            src={component.image} 
            alt={component.name}
            className="panel-image"
          />
          <div className="panel-label">
            {component.name}: {component.material}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
```

### 3. Merge Animation

**MergeAnimation.jsx**
```javascript
import { motion } from 'framer-motion'

const MergeAnimation = ({ panels, onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        // Trigger merge process
        mergePanels(panels)
        onComplete()
      }}
    >
      {/* Flash effect */}
      <div className="merge-flash" />
      
      {/* Panels collapsing */}
      <motion.div
        className="panels-wrapper"
        animate={{ 
          scaleY: [1, 0.5, 1],
          height: ['auto', '50%', '100%']
        }}
      >
        {panels.map((panel, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [-panel.offset, 0],
              opacity: [1, 0.5, 1]
            }}
          >
            <img src={panel.image} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
```

### 4. Image Compositing Service

**api/composite-cue.js** (Vercel serverless function)
```javascript
import sharp from 'sharp'

export default async function handler(req, res) {
  const { components } = req.body
  
  try {
    // Load all component images
    const images = await Promise.all(
      components.map(c => fetch(c.imageUrl).then(r => r.buffer()))
    )
    
    // Create canvas for final image
    const finalHeight = 3072
    const finalWidth = 1024
    const panelHeight = 512
    
    // Composite images vertically
    const composite = await sharp({
      create: {
        width: finalWidth,
        height: finalHeight,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
    .composite(
      images.map((img, index) => ({
        input: img,
        top: index * panelHeight,
        left: 0
      }))
    )
    .png()
    .toBuffer()
    
    // Upload to IPFS
    const ipfsCID = await uploadToIPFS(composite)
    
    res.status(200).json({ 
      success: true, 
      imageCID: ipfsCID,
      imageUrl: `ipfs://${ipfsCID}`
    })
    
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
```

### 5. State Management

**store/builderStore.js**
```javascript
import create from 'zustand'

export const useBuilderStore = create((set, get) => ({
  currentStep: 1,
  selections: {
    buttCap: null,
    wrap: null,
    forearm: null,
    joint: null,
    shaft: null,
    tip: null
  },
  
  setSelection: (component, material) => 
    set(state => ({
      selections: {
        ...state.selections,
        [component]: material
      }
    })),
  
  nextStep: () => 
    set(state => ({ currentStep: state.currentStep + 1 })),
  
  prevStep: () => 
    set(state => ({ currentStep: state.currentStep - 1 })),
  
  isComplete: () => {
    const { selections } = get()
    return Object.values(selections).every(s => s !== null)
  },
  
  getRarityScore: () => {
    const { selections } = get()
    return Object.values(selections)
      .reduce((score, material) => score + (material?.rarity || 0), 0)
  },
  
  reset: () => set({
    currentStep: 1,
    selections: {
      buttCap: null,
      wrap: null,
      forearm: null,
      joint: null,
      shaft: null,
      tip: null
    }
  })
}))
```

## Smart Contract Interface

### CueStickNFT.sol
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CueStickNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;
    
    struct CueComponents {
        string buttCap;
        string wrap;
        string forearm;
        string joint;
        string shaft;
        string tip;
        uint256 rarityScore;
        uint256 createdAt;
    }
    
    mapping(uint256 => CueComponents) public cueData;
    mapping(uint256 => string) private _tokenURIs;
    
    constructor() ERC721("XueCoin Cue Stick", "XCUE") {}
    
    function mintCue(
        address to,
        string memory tokenURI,
        CueComponents memory components
    ) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(to, tokenId);
        _tokenURIs[tokenId] = tokenURI;
        
        components.createdAt = block.timestamp;
        cueData[tokenId] = components;
        
        return tokenId;
    }
    
    function tokenURI(uint256 tokenId) 
        public 
        view 
        override 
        returns (string memory) 
    {
        require(_exists(tokenId), "Token does not exist");
        return _tokenURIs[tokenId];
    }
    
    function getCueComponents(uint256 tokenId) 
        public 
        view 
        returns (CueComponents memory) 
    {
        require(_exists(tokenId), "Token does not exist");
        return cueData[tokenId];
    }
}
```

## API Endpoints

### Material Selection
```
GET /api/materials/{component}
Response: {
  "component": "forearm",
  "materials": [
    {
      "id": "maple_birds_eye",
      "name": "Bird's Eye Maple",
      "rarity": "uncommon",
      "imageUrl": "/assets/components/forearms/maple/birds_eye_maple.png",
      "price": 0.05
    }
  ]
}
```

### Image Composite
```
POST /api/composite-cue
Body: {
  "components": [
    { "imageUrl": "...", "position": 0 },
    { "imageUrl": "...", "position": 1 },
    ...
  ]
}
Response: {
  "imageCID": "Qm...",
  "imageUrl": "ipfs://Qm..."
}
```

### NFT Minting
```
POST /api/mint-cue
Body: {
  "address": "0x...",
  "components": { ... },
  "imageCID": "Qm..."
}
Response: {
  "txHash": "0x...",
  "tokenId": 123,
  "metadataURI": "ipfs://Qm.../metadata.json"
}
```

## Performance Optimizations

1. **Image Preloading:** Lazy load component images as user progresses
2. **Caching:** Cache material selections in localStorage
3. **CDN:** Serve static assets from edge locations
4. **Compression:** Optimize PNG images with TinyPNG
5. **Progressive Loading:** Show low-res placeholders while loading high-res

## Security Considerations

1. **Rate Limiting:** Prevent spam minting
2. **Input Validation:** Verify component selections server-side
3. **IPFS Pinning:** Ensure images remain available
4. **Smart Contract Audits:** Security review before mainnet
5. **Wallet Integration:** Secure Web3 connection handling

## Deployment Checklist

- [ ] Set up Vercel project
- [ ] Configure environment variables (IPFS keys, RPC endpoints)
- [ ] Deploy smart contracts to testnet
- [ ] Upload initial material images to IPFS
- [ ] Test complete flow end-to-end
- [ ] Set up analytics (PostHog, Mixpanel)
- [ ] Configure domain and SSL
- [ ] Deploy to production
