import React, { useEffect, useMemo, useRef, useState } from 'react';
import './styles.css';

const supportEmail = 'sunhaven@gmail.com';
const heroSlides = [
  { image: '/images/sunhaven-hero-v3.png', alt: 'Handmade brass cabinet pull on deep sage-green cabinetry', room: 'SAGE GREEN · WARM BRASS', title: <>A kitchen, with <em>character.</em></>, note: 'Handmade solid brass. Made to feel like it belongs.', look: 'The Sage Kitchen' },
  { image: '/images/sunhaven-hero-ivory-kitchen.png', alt: 'Bright ivory kitchen with hand-finished antique brass cabinet pulls', room: 'SOFT IVORY · ANTIQUE BRASS', title: <>The beauty is in <em>the details.</em></>, note: 'Thoughtful details, shaped and finished by hand.', look: 'The Ivory Kitchen' },
  { image: '/images/sunhaven-hero-navy-kitchen.png', alt: 'Deep navy kitchen with warm gold handmade brass cabinet hardware', room: 'DEEP NAVY · SATIN GOLD', title: <>Make room for <em>something bold.</em></>, note: 'Sculptural brass with a little more presence.', look: 'The Navy Kitchen' },
];
const kitchenStyles = [
  { id: 'sage', name: 'Sage & brass', room: 'SAGE GREEN CABINETRY', finish: 'Warm brushed brass', image: '/images/sunhaven-hero-v3.png', alt: 'Warm brass pulls against deep sage green cabinetry', copy: 'Earthy green meets the warmth of hand-finished brass.' },
  { id: 'ivory', name: 'Ivory & antique brass', room: 'SOFT IVORY CABINETRY', finish: 'Antique brass', image: '/images/sunhaven-hero-ivory-kitchen.png', alt: 'Bright ivory kitchen with antique brass cabinet pulls', copy: 'A soft, sunlit palette with quietly classic brass.' },
  { id: 'navy', name: 'Navy & satin gold', room: 'DEEP NAVY CABINETRY', finish: 'Satin gold', image: '/images/sunhaven-hero-navy-kitchen.png', alt: 'Deep navy kitchen with satin gold cabinet hardware', copy: 'Deep color, confident contrast, a glint of gold.' },
];
const products = [
  { id: 'arbor', type: 'pull', name: 'Arbor Cabinet Pull', collection: 'Linear collection · solid brass', detail: 'A sculptural everyday favorite', tag: 'Bestseller', image: '/images/products/arbor-view1.jpg', alt: 'Arbor solid brass cabinet pull in antique bronze', finishes: ['Antique Bronze', 'Gold', 'Gunmetal'] },
  { id: 'amber', type: 'knob', name: 'Amber Round Knob', collection: 'Knurled collection · solid brass', detail: 'A little texture, a lot of character', tag: 'Made to mix', image: '/images/products/amber-view1.jpg', alt: 'Amber round knurled cabinet knob in antique bronze', finishes: ['Antique Bronze', 'Gold', 'Black'] },
  { id: 'arion', type: 'pull', name: 'Arion Knurled Pull', collection: 'Linear knurled · solid brass', detail: 'Precision-cut, easy to reach for', tag: 'Tactile by design', image: '/images/products/arion-view1.jpg', alt: 'Arion linear knurled cabinet pull in antique bronze', finishes: ['Antique Bronze', 'Gold', 'Gunmetal'] },
  { id: 'plume', type: 'appliance', name: 'Plume Appliance Pull', collection: 'Curve collection · solid brass', detail: 'A confident accent for larger fronts', tag: 'Room-making scale', image: '/images/products/plume-view1.jpg', alt: 'Plume solid brass appliance pull in antique bronze', finishes: ['Antique Bronze', 'Gold', 'Black'] },
  { id: 'alpha', type: 'pull', name: 'Alpha Half-Round Pull', collection: 'Half-round collection · solid brass', detail: 'A smooth, softened silhouette', tag: 'Quietly sculptural', image: '/images/products/alpha-view1.jpg', alt: 'Alpha half-round solid brass cabinet pull in antique bronze', finishes: ['Antique Bronze', 'Gold', 'Black'] },
  { id: 'apex', type: 'knob', name: 'Apex Round-Plate Knob', collection: 'Linear knurled · solid brass', detail: 'Texture meets a classic profile', tag: 'Sculpted detail', image: '/images/products/apex-view1.jpg', alt: 'Apex linear knurled cabinet knob in antique bronze', finishes: ['Antique Bronze', 'Gold', 'Silver'] },
  { id: 'bloom', type: 'lip', name: 'Bloom Edge Lip Pull', collection: 'Edge collection · solid brass', detail: 'A clean line for modern fronts', tag: 'Minimal profile', image: '/images/products/bloom-view1.jpg', alt: 'Bloom Edge brass lip pull in antique bronze', finishes: ['Antique Bronze', 'Gold', 'Black'] },
  { id: 'scallop', type: 'door', name: 'Scallop Entry Handle', collection: 'Architectural collection · solid brass', detail: 'Sculptural form for the entry', tag: 'A statement piece', image: '/images/products/scallop-view1.jpg', alt: 'Scallop handcrafted solid brass door handle in antique bronze', finishes: ['Antique Bronze', 'Gold'] },
  { id: 'calyx', type: 'door', name: 'Calyx Door Handle', collection: 'Architectural collection · solid brass', detail: 'A fluid, fluted profile', tag: 'Handcrafted form', image: '/images/products/calyx-view1.jpg', alt: 'Calyx handcrafted solid brass door handle in antique bronze', finishes: ['Antique Bronze', 'Gold'] },
  { id: 'grainley', type: 'door', name: 'Grainley Entry Handle', collection: 'Architectural collection · solid brass', detail: 'Natural lines, warm character', tag: 'Organic texture', image: '/images/products/grainley-view1.jpg', alt: 'Grainley handcrafted semi-circle door handle in antique bronze', finishes: ['Antique Bronze', 'Gold'] },
  { id: 'solis', type: 'door', name: 'Solis Sunburst Handle', collection: 'Architectural collection · solid brass', detail: 'A distinctive welcome home', tag: 'Made for the moment', image: '/images/products/solis-view1.jpg', alt: 'Solis handcrafted sunburst entry door handle in antique bronze', finishes: ['Antique Bronze', 'Gold'] },
  { id: 'meander', type: 'appliance', name: 'Meander Appliance Pull', collection: 'Sculpted collection · solid brass', detail: 'Organic texture at a larger scale', tag: 'For statement cabinetry', image: '/images/products/meander-view1.jpg', alt: 'Meander handcrafted solid brass appliance pull in antique bronze', finishes: ['Antique Bronze', 'Gold'] },
];

// Illustrative U.S. merchandising values for the visual prototype; confirm actual prices and reviews before launch.
const productProof = {
  arbor:{price:18,rating:'4.9',reviews:42}, amber:{price:14,rating:'4.8',reviews:31}, arion:{price:26,rating:'4.9',reviews:86}, plume:{price:68,rating:'5.0',reviews:19},
  alpha:{price:19,rating:'4.8',reviews:14}, apex:{price:17,rating:'4.9',reviews:28}, bloom:{price:22,rating:'4.8',reviews:11}, scallop:{price:89,rating:'5.0',reviews:9},
  calyx:{price:82,rating:'4.9',reviews:12}, grainley:{price:118,rating:'5.0',reviews:7}, solis:{price:148,rating:'4.9',reviews:5}, meander:{price:72,rating:'4.8',reviews:13},
};
const usd = value => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(value);
const sizeReferences = [
  { mm: 76.2, inch: '3 in' }, { mm: 96, inch: '3 25/32 in' }, { mm: 128, inch: '5 1/16 in' },
  { mm: 160, inch: '6 5/16 in' }, { mm: 192, inch: '7 9/16 in' }, { mm: 224, inch: '8 13/16 in' },
  { mm: 256, inch: '10 1/16 in' }, { mm: 304.8, inch: '12 in' },
];
const verifiedDimensions = {
  arion: [{ name: 'Small', ctcIn: '5.00', ctcMm: 128, lengthIn: '6.60', lengthMm: 168 }, { name: 'Medium', ctcIn: '6.30', ctcMm: 160, lengthIn: '8.00', lengthMm: 200 }, { name: 'Large', ctcIn: '9.00', ctcMm: 224, lengthIn: '10.40', lengthMm: 264 }],
  plume: [{ name: 'Appliance pull', ctcIn: '10.00', ctcMm: 254, lengthIn: '14.88', lengthMm: 378, widthMm: 55, heightMm: 44 }],
  scallop: [{ name: 'Door handle', ctcIn: '4.25', ctcMm: 108, lengthIn: '7.01', lengthMm: 180, widthMm: 125, heightMm: 35 }],
  grainley: [{ name: '6 in', ctcIn: '4.00', ctcMm: 102, lengthIn: '6.00', lengthMm: 152, heightMm: 35 }, { name: '8 in', ctcIn: '5.00', ctcMm: 127, lengthIn: '8.00', lengthMm: 203, heightMm: 35 }],
  solis: [{ name: 'Sunburst pull', ctcIn: '4.92', ctcMm: 125, lengthIn: '7.67', lengthMm: 195, heightMm: 44 }],
  meander: [{ name: 'Appliance pull', ctcIn: '9.52', ctcMm: 242, lengthIn: '11.41', lengthMm: 290, widthMm: 46, heightMm: 45 }],
};
const dimensionOptionLabel = size => `${size.name} · ${size.ctcIn} in / ${size.ctcMm} mm CTC`;
const categories = [
  { id: 'all', label: 'All favorites' }, { id: 'pull', label: 'Cabinet pulls' }, { id: 'knob', label: 'Knobs' },
  { id: 'appliance', label: 'Appliance pulls' }, { id: 'lip', label: 'Lip pulls' }, { id: 'door', label: 'Door hardware' },
];
const collections = [
  { id: 'cabinet', title: 'Cabinet hardware', image: products[0].image, alt: products[0].alt },
  { id: 'door', title: 'Door hardware', image: products.find(product => product.id === 'scallop').image, alt: products.find(product => product.id === 'scallop').alt },
  { id: 'knob', title: 'Cabinet knobs', image: products[1].image, alt: products[1].alt },
  { id: 'appliance', title: 'Appliance pulls', image: products.find(product => product.id === 'plume').image, alt: products.find(product => product.id === 'plume').alt },
];

const Icon = ({ name }) => {
  if (name === 'search') return <svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>;
  if (name === 'account') return <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.4"/><path d="M4.8 21c.5-4.1 3-6.2 7.2-6.2s6.7 2.1 7.2 6.2"/></svg>;
  if (name === 'bag') return <svg viewBox="0 0 24 24"><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>;
  return <svg viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18"/></svg>;
};

function Header({ bagCount, onSearch, onBag }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [['Collections', '#collections'], ['Kitchen looks', '#kitchen-visualizer'], ['Find your fit', '#size-finder'], ['Cabinet hardware', '#shop'], ['Finishes', '#shop'], ['Our craft', '#craft'], ['Trade', '#trade']];
  return <>
    <div className="announce">Handmade solid brass, shaped with care <span>·</span> <a href="#collections">Discover the collection</a></div>
    <header className="header">
      <a className="brand" href="#top" aria-label="Sunhaven Brass home"><span className="brandmark">S</span><span><span className="brand-name">SUNHAVEN BRASS</span><span className="brand-sub">HANDMADE SOLID BRASS</span></span></a>
      <nav className="nav" aria-label="Main navigation">{links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav>
      <div className="header-actions">
        <button className="icon-btn" aria-label="Search" onClick={onSearch}><Icon name="search"/></button>
        <a className="icon-btn" aria-label="Customer help" href="mailto:sunhaven@gmail.com?subject=Sunhaven%20Brass%20product%20question"><Icon name="account"/></a>
        <button className="icon-btn" aria-label="Open project list" onClick={onBag}><Icon name="bag"/><span className="bag-count">{bagCount}</span></button>
        <button className="icon-btn menu-btn" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name="menu"/></button>
      </div>
    </header>
    <nav className={`mobile-nav${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">{links.map(([label, href]) => <a href={href} key={label} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
  </>;
}

function ProductCard({ product, onOpen, onChooseOptions, onVisualize }) {
  const proof = productProof[product.id];
  return <article className="product">
    <div className="product-visual" onClick={() => onOpen(product)} role="button" tabIndex={0} onKeyDown={event => event.key === 'Enter' && onOpen(product)}>
      <img src={product.image} alt={product.alt} loading="lazy"/><span className="product-tag">{product.tag}</span>
      <span className="handmade-stamp"><i>S</i> HANDMADE</span>
      <button className="quick-add" onClick={event => { event.stopPropagation(); onChooseOptions(product); }}>Choose options&nbsp; +</button>
    </div>
    <div className="product-info"><div className="product-meta">{product.collection}</div><h3 className="product-name"><button type="button" className="product-name-button" onClick={() => onOpen(product)}>{product.name}</button></h3>
      <div className="product-rating" role="img" aria-label={`${proof.rating} out of 5 stars from ${proof.reviews} sample reviews`}><span className="rating-stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span><b>{proof.rating}</b><small>({proof.reviews} reviews)</small></div>
      <div className="product-price-row"><span className="product-price"><span className="price">{usd(proof.price)}</span><span className="price-currency">USD</span></span><button className="product-visualize" onClick={() => onVisualize(product, product.finishes[0])}>See in kitchen <span>&#8599;</span></button></div>
    </div>
  </article>;
}

function ProductGallery({ product }) {
  const [failed, setFailed] = useState([]);
  useEffect(() => setFailed([]), [product.id]);
  const gallery = Array.from({ length: 7 }, (_, index) => {
    const view = index + 1;
    return { view, image: `/images/products/${product.id}-view${view}.jpg` };
  }).filter(item => item.view !== 2 && !failed.includes(item.image));
  return <div className="product-gallery-grid-wrap" aria-label={`${product.name} product photos`}>
    <div className="quick-gallery-grid">{gallery.map((item, index) => <figure className={`quick-gallery-photo${index === 0 ? ' primary' : ''}`} key={item.image}>
      <img src={item.image} alt={`${product.name}, product view ${item.view}`} onError={() => setFailed(current => current.includes(item.image) ? current : [...current, item.image])}/>
      <figcaption>{String(index + 1).padStart(2, '0')} / PRODUCT DETAIL</figcaption>
    </figure>)}</div>
    {!gallery.length && <div className="quick-gallery-empty"><img src={product.image} alt={product.alt}/></div>}
  </div>;
}

function ProductDetailPage({ product, finish, onFinish, onBack, onFitHelp, onChooseOptions, onOpenProduct }) {
  const proof = productProof[product.id];
  const suggestions = products.filter(item => item.id !== product.id && item.type === product.type).slice(0, 3);
  const categoryLabel = { pull: 'Cabinet pulls', knob: 'Cabinet knobs', appliance: 'Appliance pulls', lip: 'Lip pulls', door: 'Door hardware' }[product.type] || 'Hardware';
  const finishTone = name => ({ Gold: 'gold', 'Antique Bronze': 'bronze', Gunmetal: 'gunmetal', Silver: 'silver', Black: 'black' }[name] || 'bronze');
  return <div className="product-page">
    <nav className="pdp-breadcrumb" aria-label="Breadcrumb"><button type="button" onClick={onBack}>Shop hardware</button><span>/</span><span>{categoryLabel}</span><span>/</span><strong>{product.name}</strong></nav>
    <div className="pdp-layout">
      <div className="pdp-gallery-column"><div className="pdp-gallery-intro"><span>THE MAKER'S DETAIL</span><span>Hand-finished solid brass</span></div><ProductGallery product={product}/><div className="pdp-gallery-caption"><span>01 - MATERIAL</span><p>Made to be seen up close. Shaped and finished by hand so the character of solid brass comes through in every detail.</p></div><div className="pdp-size-mini"><span className="pdp-size-mini-icon" aria-hidden="true">↔</span><span><b>A better fit starts here</b><small>Check screw-hole spacing before you order.</small></span><button type="button" onClick={onFitHelp}>Size guide <span>↗</span></button></div></div>
      <aside className="pdp-details">
        <div className="pdp-product-kicker"><span className="pdp-kicker-dot"/> {categoryLabel}</div>
        <h1>{product.name}</h1>
        <div className="pdp-rating-line"><a className="pdp-rating-link" href="#reviews"><span className="product-rating" role="img" aria-label={proof.rating + ' out of 5 stars from ' + proof.reviews + ' sample reviews'}><span className="rating-stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span><b>{proof.rating}</b><small>({proof.reviews} reviews)</small></span></a><span className="pdp-stock"><i/> Made to order</span></div>
        <div className="pdp-price">{usd(proof.price)} <small>USD</small></div>
        <p className="pdp-description">{product.detail}. A considered profile in solid brass, shaped for a comfortable grip and finished by hand for depth, warmth, and character.</p>
        <div className="pdp-maker-note"><span className="pdp-maker-seal">S</span><div><b>Made by hand, for the details</b><small>Each piece is individually shaped and finished. Natural variations are part of its character.</small></div></div>
        <div className="pdp-selection-block"><div className="pdp-selection-heading"><span>Finish</span><b>{finish}</b></div><div className="pdp-finishes">{product.finishes.map(name => <button type="button" key={name} aria-label={'Choose ' + name + ' finish'} aria-pressed={finish === name} className={'pdp-finish-choice' + (finish === name ? ' active' : '')} onClick={() => onFinish(name)}><i className={'pdp-finish-swatch ' + finishTone(name)}/><span>{name}</span></button>)}</div></div>
        {verifiedDimensions[product.id] ? <div className="pdp-sizes"><div className="pdp-selection-heading"><span>Size &amp; fit</span><a href="#size-finder" onClick={event => { event.preventDefault(); onFitHelp(); }}>Sizing help &rarr;</a></div>{verifiedDimensions[product.id].map(size => <div key={size.name} className="pdp-size-row"><b>{size.name}</b><span>{size.ctcIn} in / {size.ctcMm} mm center-to-center</span><small>{size.lengthIn} in / {size.lengthMm} mm overall</small></div>)}</div> : <a className="pdp-measure-link" href="#size-finder" onClick={event => { event.preventDefault(); onFitHelp(); }}><span className="pdp-measure-icon">&#8596;</span><span><b>Not sure about size?</b><small>Use the Fit Finder to compare your measurements.</small></span><i>?</i></a>}
        <button type="button" className="button pdp-options-button" onClick={() => onChooseOptions(product, finish)}>Choose options <span>+</span></button>
        <div className="pdp-purchase-note"><span>Free finish and fit guidance</span><span>U.S. shipping quoted with your project</span></div>
        <div className="pdp-info-line"><span>Solid brass</span><span>Hand-finished</span><span>Made for daily use</span></div>
      <div className="pdp-side-content"><section className="pdp-story-row"><div><span className="section-label">A CLOSER LOOK</span><h2>Good hardware should feel as considered as it looks.</h2></div><p>From the first shaping to the final finish, this piece is made to bring a tactile point of difference to the rooms you use every day. Its weight, edges, and surface are all part of the experience.</p></section><section className="pdp-information"><div className="pdp-information-heading"><span className="section-label">PRODUCT DETAILS</span><h2>Made for the way you live.</h2></div><div className="pdp-accordions"><details open><summary>Materials &amp; finish <span>+</span></summary><p>Made from solid brass and finished by hand. Choose from {product.finishes.join(', ')}. Finish appearance may vary slightly with the natural character of the material.</p></details><details><summary>Measurements &amp; installation <span>+</span></summary><p>{verifiedDimensions[product.id]?.map(size => size.name + ': ' + size.ctcIn + ' in / ' + size.ctcMm + ' mm center-to-center, ' + size.lengthIn + ' in / ' + size.lengthMm + ' mm overall.').join(' ') || 'Check your existing center-to-center measurement before ordering. The Fit Finder can help you identify a suitable size and estimate the quantity for your project.'} Mounting hardware and final fit should be confirmed for your cabinet or door before installation.</p></details><details><summary>Shipping, care &amp; support <span>+</span></summary><p>Request a project quote for current U.S. shipping, availability, and lead time. Clean with a soft dry cloth; avoid abrasive cleaners to preserve the finish. Contact us for help coordinating a multi-room project.</p></details></div></section></div></aside>
    </div>
    
    
<section className="pdp-reviews" id="reviews" aria-labelledby="pdp-reviews-title"><div className="pdp-reviews-head"><div><span className="section-label">CUSTOMER REVIEWS</span><h2 id="pdp-reviews-title">Notes from the people who live with it.</h2></div><div className="pdp-reviews-rating"><span className="rating-stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span><b>{proof.rating}</b><small>{proof.reviews} sample ratings</small></div></div><div className="pdp-review-list"><article className="pdp-review-card"><div className="pdp-review-card-top"><span className="rating-stars" aria-label="Five stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span><span>SAMPLE REVIEW</span></div><h3>What a verified customer will notice</h3><p>Customer feedback about the finish, feel, and installation will appear here once reviews are collected.</p><small>Example review layout</small></article><article className="pdp-review-card pdp-review-card-secondary"><div className="pdp-review-card-top"><span className="rating-stars" aria-label="Five stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span><span>SAMPLE REVIEW</span></div><h3>A detail that feels right at home</h3><p>This space is reserved for a real customer&apos;s experience with this handmade piece.</p><small>Example review layout</small></article><a className="pdp-review-ask" href="mailto:sunhaven@gmail.com?subject=Sunhaven%20Brass%20product%20question">Ask us a question <span>&#8599;</span></a></div><p className="pdp-review-note">Ratings shown are prototype placeholders. Verified customer reviews should replace these before launch.</p></section>
        {!!suggestions.length && <section className="pdp-recommendations"><div className="section-label">CONTINUE EXPLORING</div><h2>Pieces with a similar feel.</h2><div className="pdp-suggestion-grid">{suggestions.map(item => <button type="button" className="pdp-suggestion" key={item.id} onClick={() => onOpenProduct(item)}><img src={item.image} alt=""/><span><small>HANDMADE SOLID BRASS</small><b>{item.name}</b><i>{usd(productProof[item.id].price)}</i></span><strong>&#8599;</strong></button>)}</div></section>}
  </div>;
}

const kitchenLooks = [
  { id: 'sage', name: 'Sage green shaker', note: 'Warm and timeless', finish: 'Warm brushed brass', image: '/images/sunhaven-kitchen-sage-real.png', alt: 'Photorealistic sage green shaker kitchen with brass cabinet hardware' },
  { id: 'white', name: 'Warm ivory kitchen', note: 'Soft, sunlit, and quietly classic', finish: 'Antique bronze', image: '/images/sunhaven-hero-ivory-kitchen.png', alt: 'Photorealistic ivory kitchen with warm brass cabinet hardware' },
  { id: 'navy', name: 'Deep navy kitchen', note: 'Confident color with a golden accent', finish: 'Satin gold', image: '/images/sunhaven-hero-navy-kitchen.png', alt: 'Photorealistic navy kitchen with gold cabinet hardware' },
];
function KitchenPhotoPreview({ product, finish }) {
  const [photo, setPhoto] = useState('');
  const [placement, setPlacement] = useState({ x: 50, y: 50 });
  const [horizontal, setHorizontal] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => { if (!photo) return undefined; return () => URL.revokeObjectURL(photo); }, [photo]);
  const uploadPhoto = event => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    setPhoto(URL.createObjectURL(file));
    setPlacement({ x: 50, y: 50 });
  };
  const placeHardware = event => {
    if (!photo) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPlacement({ x: Math.max(4, Math.min(96, ((event.clientX - bounds.left) / bounds.width) * 100)), y: Math.max(7, Math.min(93, ((event.clientY - bounds.top) / bounds.height) * 100)) });
  };
  const finishColor = ({ Gold: '#c49a48', 'Antique Bronze': '#71533b', Gunmetal: '#63696b', Silver: '#a8a9a4', Black: '#252a2b' }[finish] || '#c49a48');
  const isKnob = product.type === 'knob';
  return <div className="photo-tryon">
    <div className="photo-tryon-head"><div><span className="section-label">Your room, your choice</span><h3>Try it on your kitchen.</h3><p>Upload a photo, then click where you would place the hardware. The preview stays on this device.</p></div><div className="photo-actions"><input ref={inputRef} className="photo-file-input" type="file" accept="image/*" onChange={uploadPhoto} aria-label="Choose a kitchen photo"/><button className="button" type="button" onClick={() => inputRef.current?.click()}>{photo ? 'Choose another photo' : 'Upload a kitchen photo'} <span>＋</span></button>{photo && <button className="photo-reset" type="button" onClick={() => { setPhoto(''); if (inputRef.current) inputRef.current.value = ''; }}>Remove photo</button>}</div></div>
    <div className={`photo-preview-stage${photo ? ' has-photo' : ''}`} onClick={placeHardware} role={photo ? 'button' : undefined} tabIndex={photo ? 0 : undefined} onKeyDown={event => { if (photo && (event.key === 'Enter' || event.key === ' ')) setPlacement({ x: 50, y: 50 }); }}>
      {photo ? <><img className="uploaded-kitchen" src={photo} alt="Your uploaded kitchen"/><span className={`photo-hardware${isKnob ? ' knob' : ''}${horizontal ? ' horizontal' : ''}`} style={{ left: `${placement.x}%`, top: `${placement.y}%`, '--hardware-color': finishColor }} aria-label={`${product.name} preview`}><i/><b>{product.name} · {finish}</b></span><span className="photo-place-hint">Click to reposition the sample</span></> : <div className="photo-empty"><span className="photo-empty-icon">＋</span><strong>Bring your kitchen into the preview</strong><small>Select a JPG, PNG, or WEBP photo. Landscape photos work best.</small></div>}
    </div>
    {photo && <div className="photo-preview-footer"><span>Showing {product.name} in {finish}</span>{!isKnob && <button type="button" className="photo-reset" onClick={() => setHorizontal(value => !value)}>Rotate sample 90°</button>}</div>}
  </div>;
}

function KitchenVisualizer({ product, finish, onProduct, onFinish, onShop }) {
  const [activeLookId, setActiveLookId] = useState('sage');
  const activeLook = kitchenLooks.find(look => look.id === activeLookId) || kitchenLooks[0];
  const changeProduct = id => { const next = products.find(item => item.id === id); if (next) onProduct(next); };
  return <section className="kitchen-visualizer" id="kitchen-visualizer">
    <div className="kitchen-heading"><div><div className="section-label">Handmade hardware, in a real room</div><h2>See it in the kitchen.</h2><p>Explore real kitchen photography, then choose the hardware and finish that suit your space.</p></div><div className="visual-controls"><label htmlFor="visual-product">Preview a piece</label><select id="visual-product" value={product.id} onChange={event => changeProduct(event.target.value)}>{products.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select><span className="visual-selected">Selected: {product.name}</span></div></div>
    <div className="kitchen-showcase-controls"><div className="visual-finish-row"><span>Choose a finish</span>{product.finishes.map(name => <button key={name} className={`visual-finish${finish === name ? ' active' : ''}`} onClick={() => onFinish(name)}><i className={`swatch ${({ Gold: 'gold', 'Antique Bronze': 'bronze', Gunmetal: 'gunmetal', Silver: 'gunmetal', Black: 'black' }[name] || 'bronze')}`}/>{name}</button>)}</div><button type="button" className="text-link kitchen-shop-look" onClick={() => onShop(product, finish)}>Explore this piece <span>↗</span></button></div>
    <div className="kitchen-showcase">
      <div className="kitchen-feature-photo"><img key={activeLook.id} src={activeLook.image} alt={activeLook.alt} loading="lazy"/><div className="kitchen-photo-shade"/><div className="kitchen-photo-caption"><span className="kitchen-look-kicker">A ROOM TO COME HOME TO</span><h3>{activeLook.name}</h3><p>{activeLook.note}</p></div><div className="kitchen-photo-badge"><span className="brandmark">S</span><span>HANDMADE<br/>SOLID BRASS</span></div></div>
      <div className="kitchen-look-picker" role="group" aria-label="Choose a kitchen style"><div className="kitchen-picker-heading"><span className="section-label">Explore the looks</span><span>0{ kitchenLooks.findIndex(look => look.id === activeLook.id) + 1 } / 0{ kitchenLooks.length }</span></div>{kitchenLooks.map((look,index) => <button type="button" key={look.id} className={`kitchen-look-option${activeLook.id === look.id ? ' active' : ''}`} aria-pressed={activeLook.id === look.id} onClick={() => setActiveLookId(look.id)}><img src={look.image} alt="" loading="lazy"/><span className="kitchen-look-option-copy"><small>0{index + 1} · {look.finish.toUpperCase()}</small><b>{look.name}</b><span>{look.note}</span></span><i aria-hidden="true">↗</i></button>)}</div>
    </div>
    <p className="visual-note">Room photography is for finish inspiration. Select your product and finish above; the exact hardware shown may vary.</p>
    <KitchenPhotoPreview product={product} finish={finish}/>
  </section>;
}
function FitFinder({ onAddPlan, notify }) {
  const [unit, setUnit] = useState('in');
  const [measurement, setMeasurement] = useState('');
  const [counts, setCounts] = useState({ doors: 0, drawers: 0, tall: 0 });
  const value = Number(measurement);
  const mm = unit === 'in' ? value * 25.4 : value;
  const nearest = Number.isFinite(mm) && mm > 0 ? sizeReferences.reduce((best, item) => Math.abs(item.mm - mm) < Math.abs(best.mm - mm) ? item : best) : null;
  const pieceCount = counts.doors + counts.drawers + counts.tall;
  const countLabel = [counts.doors && `${counts.doors} doors`, counts.drawers && `${counts.drawers} drawer fronts`, counts.tall && `${counts.tall} tall fronts`].filter(Boolean).join(' · ');
  const changeCount = (key, delta) => setCounts(current => ({ ...current, [key]: Math.max(0, Math.min(250, current[key] + delta)) }));
  const setPreset = preset => setMeasurement(unit === 'in' ? (preset / 25.4).toFixed(3) : String(preset));
  const addPlan = () => {
    if (!pieceCount) return notify('Add your cabinet and drawer counts first.');
    const spacing = nearest ? `Measured spacing: ${(mm / 25.4).toFixed(3)} in / ${mm.toFixed(1)} mm` : 'Hole spacing not measured yet';
    onAddPlan({ name: 'Kitchen size plan', finish: 'Room count', size: `${spacing} · ${counts.doors} doors · ${counts.drawers} drawer fronts · ${counts.tall} tall fronts`, qty: pieceCount, image: products[0].image, alt: 'Cabinet hardware room plan' });
  };
  return <section className="size-studio" id="size-finder">
    <div className="size-studio-head"><div><div className="section-label">The Sunhaven Fit Finder</div><h2>Get the fit right<br/>before you order.</h2><p>Replacing existing pulls? Start with the screw holes. Planning a new kitchen? Build a quick room list. Your measurements stay in inches and millimeters, side by side.</p><div className="size-promise"><span>01</span> Measure center to center <i>·</i> <span>02</span> Find a standard reference <i>·</i> <span>03</span> Plan your pieces</div></div>
      <div className="fit-card"><div className="fit-card-top"><div><div className="fit-step">01 / MATCH EXISTING HOLES</div><h3>What is the distance between screw-hole centers?</h3><p>Measure from the middle of one screw hole to the middle of the other. Pull length is a different measurement.</p></div><div className="fit-diagram" aria-hidden="true"><span className="fit-hole"/><span className="fit-rule"><i/><i/><i/><i/><i/></span><span className="fit-hole"/><span className="fit-dimension">CENTER TO CENTER</span></div></div>
        <div className="fit-entry"><label htmlFor="fitMeasure">Your hole spacing</label><div className="fit-input-row"><input id="fitMeasure" type="number" min="0.1" max="1000" step="any" inputMode="decimal" placeholder={unit === 'in' ? 'e.g. 3.75' : 'e.g. 96'} value={measurement} onChange={event => setMeasurement(event.target.value)}/><div className="unit-switch" role="group" aria-label="Measurement units"><button type="button" className={`unit-button${unit === 'in' ? ' active' : ''}`} onClick={() => setUnit('in')}>IN</button><button type="button" className={`unit-button${unit === 'mm' ? ' active' : ''}`} onClick={() => setUnit('mm')}>MM</button></div></div><div className="fit-input-hint">Measure to the nearest 1/16 in, or use millimeters.</div>
          <div className="fit-output" aria-live="polite"><span className="fit-output-icon">&#10003;</span>{nearest ? <span><strong>{Math.abs(nearest.mm - mm) <= 1.5 ? 'Closest reference size' : 'Nearest common reference'}: {nearest.inch} / {nearest.mm} mm</strong><small>You entered {unit === 'in' ? `${value} in` : `${value} mm`} ({mm.toFixed(1)} mm / ${(mm / 25.4).toFixed(3)} in). Compare the exact product CTC before ordering.</small></span> : <span>Enter your measurement for a size match.</span>}</div>
          <div className="common-size-row"><span>Common references</span>{sizeReferences.slice(0, 6).map(item => <button type="button" key={item.mm} onClick={() => setPreset(item.mm)}>{item.mm === 76.2 ? '3 in' : `${item.mm} mm`}</button>)}</div>
        </div>
      </div>
    </div>
    <div className="room-planner"><div className="planner-intro"><div className="fit-step">03 / PLAN YOUR ROOM</div><h3>How many fronts are you updating?</h3><p>Count each cabinet door, drawer front, and tall appliance or pantry front. We'll turn your room into a clean hardware checklist.</p></div>
      <div className="planner-controls">{[['doors','Cabinet doors','Usually one knob or pull each'],['drawers','Drawer fronts','Count each drawer face'],['tall','Tall / appliance fronts','Pantry and integrated appliances']].map(([key,label,hint]) => <div className="planner-counter" key={key}><span><b>{label}</b><small>{hint}</small></span><div className="stepper"><button type="button" aria-label={`Remove ${label}`} onClick={() => changeCount(key,-1)}>−</button><output>{counts[key]}</output><button type="button" aria-label={`Add ${label}`} onClick={() => changeCount(key,1)}>+</button></div></div>)}</div>
      <div className="planner-summary"><div><span className="fit-step">YOUR ROOM LIST</span><strong>{pieceCount} {pieceCount === 1 ? 'piece' : 'pieces'}</strong><small>{countLabel ? `${countLabel} · one piece per front as a starting estimate` : 'Add a few fronts above to start your list.'}</small></div><button className="button" type="button" onClick={addPlan}>Add room plan to list&nbsp; +</button></div>
    </div>
    <div className="fit-footnote">Size references help narrow your search. Always match the exact center-to-center measurement and fixing details shown on the individual product before ordering. Reference conversions from <a href="https://www.berensonhardware.com/support/center-to-center-conversion" target="_blank" rel="noreferrer">Berenson's center-to-center chart</a>.</div>
  </section>;
}

function App() {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('featured');
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [productModal, setProductModal] = useState(null);
  const [detailProduct, setDetailProduct] = useState(() => {
    const id = window.location.hash.startsWith('#product/') ? window.location.hash.slice(9) : '';
    return products.find(item => item.id === id) || null;
  });
  const [modalFinish, setModalFinish] = useState('Antique Bronze');
  const [modalFit, setModalFit] = useState('');
  const [modalQty, setModalQty] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [bagItems, setBagItems] = useState([]);
  const [visualProduct, setVisualProduct] = useState(products[0]);
  const [visualFinish, setVisualFinish] = useState(products[0].finishes[0]);
  const [toast, setToast] = useState('');
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const collagePreview = new URLSearchParams(window.location.search).get('hero') === 'collage';
  const beforeAfterPreview = new URLSearchParams(window.location.search).get('hero') === 'beforeafter';
  const kitchenStylePreview = new URLSearchParams(window.location.search).get('hero') === 'kitchen';
  const productCloseupPreview = new URLSearchParams(window.location.search).get('hero') === 'product';
  const [kitchenStyle, setKitchenStyle] = useState('sage');
  const activeKitchen = kitchenStyles.find(style => style.id === kitchenStyle) || kitchenStyles[0];
  const [beforeAfter, setBeforeAfter] = useState(53);

  const notify = (message) => { setToast(message); window.clearTimeout(window.toastTimer); window.toastTimer = window.setTimeout(() => setToast(''), 2500); };
  const visibleProducts = useMemo(() => {
    const matches = products.filter(product => (filter === 'all' || product.type === filter) && (!query || `${product.name} ${product.collection} ${product.detail} ${product.type}`.toLowerCase().includes(query.toLowerCase())));
    if (sort === 'az') matches.sort((a,b) => a.name.localeCompare(b.name));
    if (sort === 'za') matches.sort((a,b) => b.name.localeCompare(a.name));
    return matches;
  }, [filter, query, sort]);
  const bagCount = bagItems.reduce((sum, item) => sum + item.qty, 0);
  const quoteBody = encodeURIComponent(bagItems.map(item => `${item.name} - ${item.finish} - ${item.size} - Qty ${item.qty}`).join('\n'));
  const quoteHref = `mailto:${supportEmail}?subject=${encodeURIComponent('Sunhaven Brass — U.S. project pricing request')}&body=${quoteBody}`;

  useEffect(() => {
    const close = event => { if (event.key === 'Escape') { setProductModal(null); setSearchOpen(false); setCartOpen(false); } };
    const syncProductRoute = () => {
      const id = window.location.hash.startsWith('#product/') ? window.location.hash.slice(9) : '';
      setDetailProduct(products.find(item => item.id === id) || null);
    };
    document.addEventListener('keydown', close);
    window.addEventListener('popstate', syncProductRoute);
    window.addEventListener('hashchange', syncProductRoute);
    document.body.style.overflow = cartOpen || productModal || searchOpen ? 'hidden' : '';
    return () => { document.removeEventListener('keydown', close); window.removeEventListener('popstate', syncProductRoute); window.removeEventListener('hashchange', syncProductRoute); document.body.style.overflow = ''; };
  }, [cartOpen, productModal, searchOpen]);

  useEffect(() => {
    if (collagePreview || beforeAfterPreview || kitchenStylePreview || productCloseupPreview || detailProduct || productModal) return undefined;
    if (heroPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => setHeroSlide(index => (index + 1) % heroSlides.length), 5000);
    return () => window.clearInterval(timer);
  }, [collagePreview, beforeAfterPreview, kitchenStylePreview, productCloseupPreview, detailProduct, productModal, heroPaused]);

  const addBagItem = item => { setBagItems(current => [...current, item]); setCartOpen(true); notify('Added to your project list.'); };
  const openProduct = product => {
    setProductModal(null);
    setDetailProduct(product);
    setModalFinish(product.finishes[0]);
    window.history.pushState({ productId: product.id }, '', `#product/${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openOptions = (product, finish = product.finishes[0]) => { setProductModal(product); setModalFinish(finish); setModalFit(''); setModalQty(1); };
  const openFitFinder = () => { setDetailProduct(null); window.history.pushState({}, '', '#size-finder'); requestAnimationFrame(() => document.getElementById('size-finder')?.scrollIntoView({ behavior: 'smooth', block: 'start' })); };
  const returnToShop = () => {
    setDetailProduct(null);
    window.history.pushState({}, '', '#shop');
    requestAnimationFrame(() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };
  const shopPreviewedProduct = (product, finish) => { openProduct(product); if (product.finishes.includes(finish)) setModalFinish(finish); };
  const chooseVisualProduct = (product, finish) => { setVisualProduct(product); setVisualFinish(finish && product.finishes.includes(finish) ? finish : product.finishes[0]); };
  const previewProduct = (product, finish) => { chooseVisualProduct(product, finish); document.getElementById('kitchen-visualizer')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const addSelectedProduct = () => {
    if (!productModal) return;
    const fit = modalFit || (productModal.type === 'knob' ? 'Single-hole knob' : 'Need size guidance');
    addBagItem({ name: productModal.name, finish: modalFinish, size: fit, qty: Math.max(1, Number(modalQty) || 1), image: productModal.image, alt: productModal.alt });
    setProductModal(null);
  };
  const chooseCollection = id => { setFilter(id === 'cabinet' ? 'all' : id); setQuery(''); };
  const selectFilter = id => { setFilter(id); setQuery(''); };

  return <>
    <Header bagCount={bagCount} onSearch={() => setSearchOpen(true)} onBag={() => setCartOpen(true)}/>
    <main id="top">
      {detailProduct ? <ProductDetailPage product={detailProduct} finish={modalFinish} onFinish={setModalFinish} onBack={returnToShop} onFitHelp={openFitFinder} onChooseOptions={openOptions} onOpenProduct={openProduct}/> : <>
      {collagePreview ? (
        <section className="hero hero-collage" aria-label="Sunhaven Brass editorial kitchen collage">
          <div className="collage-intro"><div className="collage-kicker"><span/> THE ART OF THE FINISH <span/></div><h1>Details that make a kitchen <em>feel like yours.</em></h1><p>Handmade solid brass. Three rooms, three moods, one thoughtful finishing touch.</p><a className="collage-cta" href="#shop">Find your finishing touch <span>&rarr;</span></a></div>
          <div className="collage-board">
            <a className="collage-main" href="#shop"><img src="/images/sunhaven-hero-v3.png" alt="Close-up of a sculptural brass pull against deep sage cabinetry" fetchPriority="high"/><span className="collage-label"><small>01 / THE SIGNATURE LOOK</small><b>Sage &amp; warm brass</b></span><span className="collage-plus">+</span></a>
            <a className="collage-side collage-ivory" href="#shop"><img src="/images/sunhaven-hero-ivory-kitchen.png" alt="Handmade brass pulls in a bright ivory kitchen"/><span className="collage-label"><small>02 / QUIETLY CLASSIC</small><b>Ivory &amp; antique brass</b></span></a>
            <a className="collage-side collage-navy" href="#shop"><img src="/images/sunhaven-hero-navy-kitchen.png" alt="Satin gold hardware in a deep navy kitchen"/><span className="collage-label"><small>03 / A LITTLE BOLDER</small><b>Navy &amp; satin gold</b></span></a>
            <div className="collage-made"><span>S</span><b>Made by hand</b><small>Solid brass, shaped with care</small></div>
          </div>
        </section>
      ) : beforeAfterPreview ? (
        <section className="hero hero-beforeafter" aria-label="Before and after cabinet hardware comparison">
          <div className="beforeafter-intro"><div className="collage-kicker"><span/> THE DIFFERENCE IS IN THE DETAIL <span/></div><h1>One small detail.<br/><em>A whole new feeling.</em></h1><p>Drag to see what handmade solid brass brings to a kitchen.</p></div>
          <div className="beforeafter-stage" style={{ '--before-after-position': `${beforeAfter}%` }}>
            <img className="beforeafter-image" src="/images/sunhaven-hero-before.png" alt="Sage green cabinets before adding brass hardware" fetchPriority="high"/>
            <img className="beforeafter-image beforeafter-after-image" src="/images/sunhaven-hero-v3.png" alt="The same cabinets finished with a handmade brass pull" style={{ clipPath: `inset(0 ${100 - beforeAfter}% 0 0)` }}/>
            <span className="beforeafter-label beforeafter-label-before">BEFORE</span><span className="beforeafter-label beforeafter-label-after">AFTER · HANDMADE SOLID BRASS</span>
            <span className="beforeafter-divider" aria-hidden="true"><i>&#8596;</i></span>
            <input className="beforeafter-range" type="range" min="0" max="100" value={beforeAfter} onChange={event => setBeforeAfter(Number(event.target.value))} aria-label="Drag to compare the cabinets before and after brass hardware" aria-valuetext={`Showing ${beforeAfter}% of the finished kitchen`}/>
          </div>
          <div className="beforeafter-footer"><span><b>Shaped and finished by hand</b><small>Solid brass · made for everyday</small></span><a href="#shop">Explore the collection <span>&rarr;</span></a></div>
        </section>
      ) : kitchenStylePreview ? (
        <section className="hero hero-kitchen-selector" aria-label="Choose a kitchen style and brass finish">
          <img key={activeKitchen.id} className="kitchen-selector-image" src={activeKitchen.image} alt={activeKitchen.alt} fetchPriority="high"/>
          <div className="kitchen-selector-shade"/>
          <div className="kitchen-selector-copy" key={`style-copy-${activeKitchen.id}`}>
            <div className="kitchen-selector-kicker"><span/> HANDMADE SOLID BRASS <i/> MADE TO FEEL AT HOME</div>
            <div className="kitchen-selector-room">{activeKitchen.room} <b>·</b> {activeKitchen.finish.toUpperCase()}</div>
            <h1>Your kitchen,<br/><em>your kind of detail.</em></h1>
            <p>{activeKitchen.copy}</p>
            <a className="kitchen-selector-cta" href="#shop">Shop {activeKitchen.name} <span>&rarr;</span></a>
          </div>
          <div className="kitchen-selector-picker-wrap">
            <div className="kitchen-selector-picker-label"><span>FIND YOUR KITCHEN MOOD</span><small>Choose a look to explore the finish</small></div>
            <div className="kitchen-selector-picker" role="group" aria-label="Select a kitchen style">
              {kitchenStyles.map((style,index) => <button type="button" key={style.id} className={`kitchen-style-card${kitchenStyle === style.id ? ' active' : ''}`} aria-pressed={kitchenStyle === style.id} onClick={() => { setKitchenStyle(style.id); setVisualFinish(style.id === 'ivory' ? 'Antique Bronze' : 'Gold'); }}><img src={style.image} alt=""/><span className="kitchen-style-card-number">0{index + 1}</span><span className="kitchen-style-card-copy"><b>{style.name}</b><small>{style.finish}</small></span><span className="kitchen-style-card-check">&#10003;</span></button>)}
            </div>
          </div>
          <div className="kitchen-selector-handmade"><span>S</span> FINISHED BY HAND IN SOLID BRASS</div>
        </section>
      ) : productCloseupPreview ? (
        <section className="hero hero-product-closeup" aria-label="Handmade brass cabinet pull close-up and sizing guide">
          <img className="product-closeup-image" src="/images/sunhaven-hero-v3.png" alt="Close view of a sculptural brass cabinet pull, hand-finished on deep green oak" fetchPriority="high"/>
          <div className="product-closeup-shade"/>
          <div className="product-closeup-copy"><div className="product-closeup-kicker"><span/> HANDMADE SOLID BRASS <i/> FINISHED BY HAND</div><h1>The finishing touch<br/>you can <em>feel.</em></h1><p>Solid brass hardware with sculpted lines, a beautiful weight, and a finish that makes everyday moments feel considered.</p><div className="product-closeup-actions"><a className="product-closeup-cta" href="#shop">Shop cabinet pulls <span>&rarr;</span></a></div></div>
          <figure className="product-detail-inset"><div className="product-detail-image"><img src="/images/sunhaven-hero-v3.png" alt="Macro detail of the hand-finished brass surface"/></div><figcaption><span>UP CLOSE</span><b>The mark of the maker</b><small>Brushed, shaped, finished by hand</small></figcaption></figure>
        </section>      ) : (      <section className="hero hero-carousel" aria-label="Sunhaven Brass kitchen collection" onMouseEnter={() => setHeroPaused(true)} onMouseLeave={() => setHeroPaused(false)} onFocusCapture={() => setHeroPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setHeroPaused(false); }}>
        <img key={heroSlide} className="hero-carousel-image" src={heroSlides[heroSlide].image} alt={heroSlides[heroSlide].alt} fetchPriority="high"/>
        <div className="hero-carousel-shade"/>
        <div className="hero-carousel-copy" key={`copy-${heroSlide}`}>
          <div className="hero-carousel-kicker"><span/> HANDMADE SOLID BRASS <i/> MADE WITH INTENTION</div>
          <div className="hero-carousel-look">{heroSlides[heroSlide].room}</div>
          <h1>{heroSlides[heroSlide].title}</h1>
          <p>{heroSlides[heroSlide].note}</p>
          <a className="hero-carousel-cta" href="#shop">Shop this look <span>&rarr;</span></a>
        </div>
        <div className="hero-carousel-credit"><span className="hero-carousel-seal">S</span><span><b>Made by hand</b><small>Solid brass, shaped with care</small></span></div>
        <div className="hero-carousel-controls" aria-label="Kitchen look slides" aria-live="off">
          <button type="button" className="hero-carousel-arrow" aria-label="Previous kitchen look" onClick={() => setHeroSlide(index => (index + heroSlides.length - 1) % heroSlides.length)}>&larr;</button>
          {heroSlides.map((slide,index) => <button type="button" key={slide.look} className={`hero-carousel-dot${heroSlide === index ? ' active' : ''}`} aria-label={`Show ${slide.look}`} aria-current={heroSlide === index ? 'true' : undefined} onClick={() => setHeroSlide(index)}><span>{String(index + 1).padStart(2,'0')}</span></button>)}
          <button type="button" className="hero-carousel-arrow" aria-label="Next kitchen look" onClick={() => setHeroSlide(index => (index + 1) % heroSlides.length)}>&rarr;</button>
        </div>
        <figure className="product-detail-inset hero-detail-inset"><div className="product-detail-image"><img key={`detail-${heroSlide}`} src={products[heroSlide % products.length].image} alt={`${products[heroSlide % products.length].name}, handmade solid brass hardware`}/></div><figcaption><span>MADE SLOWLY</span><b>The maker&apos;s touch</b><small>Shaped and finished by hand</small></figcaption></figure>        <a className="hero-scroll-cue" href="#collections"><span/> EXPLORE THE DETAILS</a>
      </section>
      )}
      <section className="trustbar" aria-label="Product details">{[['✳','Handmade solid brass','Shaped and finished by hand'],['◌','Finishes with depth','Made to live beautifully'],['⌖','Details that matter','Thoughtful from every angle'],['⌂','Made for real homes','For kitchens and beyond']].map(([symbol,title,detail]) => <div className="trust" key={title}><span className="trust-ico">{symbol}</span><span><b>{title}</b><small>{detail}</small></span></div>)}</section>
      <section className="section" id="collections"><div className="section-top"><div><div className="section-label">Find your finishing touch</div><h2>Explore the collections</h2></div><p>From quiet and considered to confidently sculptural, discover the details that make a space feel like yours.</p></div><div className="collections">{collections.map(item => <a className="collection" href="#shop" key={item.id} onClick={() => chooseCollection(item.id)}><div className="collection-image"><img src={item.image} alt={item.alt} loading="lazy"/></div><div className="collection-caption"><strong>{item.title}</strong><span>↗</span></div></a>)}</div></section>
      <section className="section bestsellers" id="shop"><div className="section-top"><div><div className="section-label">Hand-finished in solid brass</div><h2>Considered bestsellers</h2></div><div className="filters" role="group" aria-label="Filter products">{categories.map(item => <button key={item.id} className={`filter${filter === item.id ? ' active' : ''}`} onClick={() => selectFilter(item.id)}>{item.label}</button>)}</div></div>
        <div className="catalog-tools"><span className="catalog-count">{visibleProducts.length} {visibleProducts.length === 1 ? 'piece' : 'pieces'} in the collection</span><select className="sort-select" aria-label="Sort products" value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Sort: Featured</option><option value="az">Name: A to Z</option><option value="za">Name: Z to A</option></select></div>
        <div className="products">{visibleProducts.map(product => <ProductCard key={product.id} product={product} onOpen={openProduct} onChooseOptions={openOptions} onVisualize={previewProduct}/>)}</div>
        
      </section>
      <KitchenVisualizer product={visualProduct} finish={visualFinish} onProduct={product => chooseVisualProduct(product)} onFinish={setVisualFinish} onShop={shopPreviewedProduct}/>
      <FitFinder onAddPlan={addBagItem} notify={notify}/>
      <section className="editorial" id="story"><div className="editorial-product-collage" aria-label="A close look at handmade brass cabinet hardware">{[products[0],products[2],products[1],products[4],products[3],products[5]].map((item,index)=><div className={`editorial-product-shot shot-${index+1}`} key={item.id}><img src={item.image} alt={`${item.name}, handmade solid brass`} loading="lazy"/></div>)}</div><div className="editorial-copy"><div className="eyebrow">A detail worth noticing</div><h2>Small change.<br/>Whole new feeling.</h2><p>One thoughtful piece of handmade brass can shift the feel of a whole room. Explore tactile forms, warm finishes, and proportions made to be reached for every day.</p><a className="button" href="#shop">Meet the bestsellers <span>↗</span></a></div></section>
      <section className="finish-section" id="finishes"><div className="finish-grid"><div className="finish-product-collage" aria-label="Solid brass hardware shown in multiple silhouettes and finishes">{[products[6],products[3],products[1],products[5],products[0],products[4],products[2]].map((item,index)=><div className={`finish-product-shot finish-shot-${index+1}`} key={item.id}><img src={item.image} alt={`${item.name} detail`} loading="lazy"/></div>)}</div><div className="finish-copy"><div className="section-label">Choose the mood</div><h2>The finish makes it personal.</h2><p>Warm gold, softly aged bronze, or quietly understated dark tones. Find the finish that feels at home with the materials and colors you love.</p><div className="finish-list">{[['Gold','fgold'],['Antique bronze','fbronze'],['Gunmetal','fgun'],['Black','fblack']].map(([name, style]) => <a className="finish-option" key={name} href="#shop"><i className={`finish-circle ${style}`}/>{name}<span>↗</span></a>)}</div><a className="text-link" href="#shop">Shop by finish <span>↗</span></a></div></div></section>
      <section className="story-strip" id="craft" aria-labelledby="craft-heading">
        <img className="story-strip-photo" src="/images/sunhaven-walnut-room-banner.png" alt="Warm walnut kitchen flowing into a softly lit dining and living room, with handmade brass cabinet pulls" loading="lazy"/>
        <div className="story-strip-shade"/>
        <div className="story-strip-copy"><span className="section-label">THE FINISHING TOUCH</span><h2 id="craft-heading">A detail you&apos;ll reach for.<br/><em>Every day.</em></h2><p>Warm brass, sculptural lines, and a considered weight bring a little more character to everyday moments.</p><a className="story-strip-link" href="#shop">Explore the collection <span>↗</span></a></div>
        <span className="story-strip-caption">THE SMALL DETAIL. THE DAILY DIFFERENCE.</span>
      </section>
      <section className="craft">{[['✳','Handmade, always','Every piece is shaped and finished by hand in solid brass.'],['02','Designed to be lived with','Considered shapes, tactile details, and finishes that feel good in the hand.'],['03','Details, made yours','Explore silhouettes and tones to bring a personal finish to every room.']].map(([symbol,title,detail]) => <div className="craft-item" key={title}><span className="craft-symbol">{symbol}</span><h3>{title}</h3><p>{detail}</p></div>)}</section>
      <section className="trade" id="trade"><div><div className="section-label">For designers, builders &amp; cabinetmakers</div><h2>Good projects start with good details.</h2><p>Working on a kitchen, a whole home, or a hospitality project? Talk with us about coordinating handmade brass hardware across your plans.</p></div><a className="button" href="mailto:sunhaven@gmail.com?subject=Trade%20and%20project%20enquiry">Let's talk about your project <span>↗</span></a></section>
      </>}
    </main>
    <footer className="footer" id="contact"><div className="footer-grid"><div className="footer-about"><a className="brand" href="#top"><span className="brandmark">S</span><span><span className="brand-name">SUNHAVEN BRASS</span><span className="brand-sub">HANDMADE SOLID BRASS</span></span></a><p>Handmade solid brass cabinet and architectural hardware, shaped with care for the everyday.</p></div><div className="footer-col"><h4>Explore</h4><a href="#collections">Collections</a><a href="#shop">Bestsellers</a><a href="#shop">Finishes</a><a href="#craft">Our craft</a></div><div className="footer-col"><h4>Here to help</h4><a href="mailto:sunhaven@gmail.com">Contact Sunhaven</a><a href="#craft">FAQs</a><a href="#trade">Shipping information</a><a href="#trade">Returns</a></div><div className="newsletter"><h4>A note from Sunhaven Brass</h4><p>New collections, considered spaces, and details worth saving.</p><form className="newsletter-form" onSubmit={event => { event.preventDefault(); setNewsletterMessage('Opening your email app to send your signup to Sunhaven.'); window.location.href = `mailto:sunhaven@gmail.com?subject=Join%20the%20Sunhaven%20Brass%20newsletter&body=${encodeURIComponent(event.currentTarget.querySelector('input').value)}`; }}><input type="email" required placeholder="Your email address" aria-label="Your email address"/><button aria-label="Sign up">↗</button></form>{newsletterMessage && <p className="newsletter-message" role="status">{newsletterMessage}</p>}</div></div><div className="footer-bottom"><span>© 2026 SUNHAVEN BRASS</span><span>UNITED STATES &nbsp;·&nbsp; USD $</span></div></footer>

    {searchOpen && <div className="modal-backdrop open" onMouseDown={event => event.target === event.currentTarget && setSearchOpen(false)}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="searchTitle"><button className="modal-close" aria-label="Close search" onClick={() => setSearchOpen(false)}>×</button><h3 id="searchTitle">Find your finishing touch.</h3><p>Search by collection, finish, or product style.</p><form className="modal-search" onSubmit={event => { event.preventDefault(); setFilter('all'); setSearchOpen(false); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); }}><input type="search" autoFocus placeholder="Try a knurled brass pull" aria-label="Search catalog" value={query} onChange={event => setQuery(event.target.value)}/><button className="button">Search&nbsp; ↗</button></form></div></div>}

    {productModal && <div className="modal-backdrop open" onMouseDown={event => event.target === event.currentTarget && setProductModal(null)}><div className="modal options-modal" role="dialog" aria-modal="true" aria-labelledby="quickName"><div className="options-modal-image"><img src={productModal.image} alt={productModal.alt || productModal.name}/></div><div className="options-modal-info"><button className="modal-close" aria-label="Close options" onClick={() => setProductModal(null)}>×</button><div className="section-label">Choose your details</div><h3 id="quickName">{productModal.name}</h3><div className="quick-price">{usd(productProof[productModal.id].price)} <span>USD</span></div><p className="price-note">Handmade in solid brass. U.S. pricing and availability are confirmed with your quote.</p>
      <div className="quick-label">Finish</div><div className="quick-options">{productModal.finishes.map(name => <button key={name} className={`quick-option${modalFinish === name ? ' active' : ''}`} onClick={() => setModalFinish(name)}>{name}</button>)}</div>
      {verifiedDimensions[productModal.id] ? <div className="quick-dimension-block"><div className="quick-label">Choose a size</div><div className="quick-dimension-options">{verifiedDimensions[productModal.id].map(size => <button type="button" key={size.name} className={`quick-option${modalFit === dimensionOptionLabel(size) ? ' active' : ''}`} onClick={() => setModalFit(dimensionOptionLabel(size))}><strong>{size.name}</strong><span>{size.ctcIn} in / {size.ctcMm} mm CTC</span><small>{size.lengthIn} in / {size.lengthMm} mm overall</small></button>)}</div></div> : <><div className="quick-label">{productModal.type === 'knob' ? 'Mounting style' : productModal.type === 'door' ? 'Door application' : 'Size guidance'}</div><div className="quick-options">{(productModal.type === 'knob' ? ['Single-hole knob','Need size guidance'] : productModal.type === 'door' ? ['Single handle','Pair of handles','Need application guidance'] : ['Under 4 in / 102 mm','4–8 in / 102–203 mm','Over 8 in / 203 mm','Need size guidance']).map(value => <button key={value} className={`quick-option${modalFit === value ? ' active' : ''}`} onClick={() => setModalFit(value)}>{value}</button>)}</div></>}
      <div className="quick-actions"><input type="number" min="1" max="999" value={modalQty} aria-label="Quantity" onChange={event => setModalQty(event.target.value)}/><button className="button" onClick={addSelectedProduct}>Add to project list&nbsp; +</button></div></div></div></div>}    <div className={`cart-scrim${cartOpen ? ' open' : ''}`} onClick={() => setCartOpen(false)}/><aside className={`cart-panel${cartOpen ? ' open' : ''}`} aria-label="Project list" aria-modal="true"><div className="cart-head"><h3>Your project list</h3><button className="icon-btn" aria-label="Close list" onClick={() => setCartOpen(false)}>×</button></div><div className="cart-items">{bagItems.length ? bagItems.map((item,index) => <div className="cart-row" key={`${item.name}-${index}`}><img src={item.image} alt={item.alt}/><div><strong>{item.name}</strong><small>{item.finish} · {item.size} · Qty {item.qty}</small><button onClick={() => setBagItems(current => current.filter((_,i) => i !== index))}>Remove</button></div></div>) : <div className="cart-empty">Your project list is waiting for a few good details.</div>}</div><div className="cart-footer"><p>Send your selection list to request U.S. pricing, shipping, lead time, and finish availability for your project.</p><a className="button" href={quoteHref}>Request pricing&nbsp; ↗</a></div></aside>
    {toast && <div className="toast show" role="status" aria-live="polite">{toast}</div>}
  </>;
}

export default App;
