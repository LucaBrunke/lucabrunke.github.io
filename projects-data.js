// PROJECT RESULTS: edit this file to add or change portfolio items.
// Each entry is ONE result (one tile). Several results can share a project.
//
//   id          unique, no spaces
//   project     project name (results with the same name are grouped)
//   methods     list of methods; these become the filter chips
//   year        shown on the tile
//   title       tile + lightbox title
//   description one sentence, shown only in the lightbox
//   media       gallery in the lightbox; the FIRST item is the tile cover
//                 { img: 'images/file.jpg' }      a photo or render
//                 { model: 'models/file.glb' }    an interactive 3D model
//                 { sketchfab: 'https://sketchfab.com/models/ID/embed' }   a Sketchfab model
//                 { label: 'text' }               placeholder until you add an image
//   docs        optional link to the MkDocs page ('' = no button)

export default [
  {
    id: 'automask',
    project: 'Exeter Underground Passages',
    methods: ['Computer vision', 'Photogrammetry'],
    year: '2025',
    title: 'City photogrammetry & auto-masking',
    description: 'A pre-trained Mask R-CNN model in Python removes vehicles and pedestrians from urban photo sets, improving feature matching and reconstruction.',
    media: [
      { img: 'images/automask-photo.jpg' },
      { img: 'images/automask-mask.jpg' },
    ],
    docs: '',
  },
  {
    id: 'romangate',
    project: 'Exeter Underground Passages',
    methods: ['Photogrammetry'],
    year: '2025',
    title: 'Heritage Centre and Roman Gate',
    description: 'Photogrammetric models of the surface connections of Exeter\u2019s underground passages, linking the subterranean network to the modern streetscape.',
    media: [
      { img: 'images/heritage-centre-model.jpg' },
      { img: 'images/heritage-centre-interior.jpg' },
    ],
    docs: '',
  },
  {
    id: 'cowcastle',
    project: 'Cow Castle',
    methods: ['Drone survey'],
    year: '2025',
    title: 'Aerial survey of Cow Castle hillfort',
    description: 'Drone photogrammetry of an Exmoor hillfort, producing a detailed 3D map of the site in the River Barle valley.',
    media: [
      { img: 'images/cow-castle-featured.jpg' },
      { img: 'images/cow-castle-outputs.jpg' },
      { img: 'images/cow-castle-layout.jpg' },
      { img: 'images/cow-castle-landscape.jpg' },
    ],
    docs: '',
  },
  {
    id: 'fogou',
    project: 'Halliggye Fogou',
    methods: ['Photogrammetry'],
    year: '2025',
    title: 'Photogrammetry of Halliggye Fogou',
    description: 'A test case for recording low-light, confined spaces, addressing artificial lighting, equipment limits and texture artefacts.',
    media: [
      { img: 'images/fogou-mesh-texture.jpg' },
      { sketchfab: 'https://sketchfab.com/models/20f1fd517c7748639fb59b27419585b7/embed' },
      { img: 'images/fogou-section.jpg' },
      { img: 'images/fogou-passage.jpg' },
      { img: 'images/fogou-site-plan.jpg' },
    ],
    docs: '', // add the MkDocs URL here when the page exists
  },
  {
    id: 'southcoaster',
    project: 'South Coaster',
    methods: ['Drone survey'],
    year: '2024',
    title: 'Aerial survey of the South Coaster wreck',
    description: 'Initial drone survey of a decaying wreck in the Exe estuary near Starcross; further capture under better conditions is planned.',
    media: [
      { img: 'images/south-coaster-drone.jpg' },
      { img: 'images/south-coaster-model.jpg' },
      { img: 'images/south-coaster-map.jpg' },
      { img: 'images/south-coaster-ortho.jpg' },
    ],
    docs: '',
  },
];
