export type City = {
  name: string;
  slug: string;
  county: 'Los Angeles' | 'Ventura';
  region: 'San Fernando Valley' | 'Westside' | 'South Bay' | 'San Gabriel Valley' | 'Gateway Cities' | 'Antelope Valley' | 'Santa Clarita Valley' | 'Conejo Valley' | 'Ventura County' | 'Greater Los Angeles' | 'Harbor Area';
  zips: string[];
  climate: 'coastal' | 'inland-valley' | 'high-desert' | 'foothills' | 'urban-core';
  notableNeighborhoods: string[];
  housingNotes: string;
  moldRiskFactors: string[];
};

const C = (
  name: string,
  county: City['county'],
  region: City['region'],
  zips: string[],
  climate: City['climate'],
  notableNeighborhoods: string[],
  housingNotes: string,
  moldRiskFactors: string[]
): City => ({
  name,
  slug: name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, ''),
  county,
  region,
  zips,
  climate,
  notableNeighborhoods,
  housingNotes,
  moldRiskFactors,
});

export const cities: City[] = [
  // San Fernando Valley
  C('Arleta', 'Los Angeles', 'San Fernando Valley', ['91331'], 'inland-valley', ['Branford-Osborne', 'Beachy Avenue corridor'], 'Mid-century single-family homes and 1970s stucco apartments dominate, often with original plumbing and slab foundations prone to slab leaks.', ['hot inland summers driving condensation', 'aging galvanized plumbing', 'original 1950s/60s HVAC ducts in attics']),
  C('Canoga Park', 'Los Angeles', 'San Fernando Valley', ['91303', '91304', '91306'], 'inland-valley', ['West Hills border', 'Owensmouth corridor'], 'A blend of post-war ranch homes, 1970s townhomes, and large mixed-use multifamily buildings near Topanga.', ['flat roofs on commercial buildings', 'shared walls in apartment complexes', 'monsoon-driven roof leaks']),
  C('Chatsworth', 'Los Angeles', 'San Fernando Valley', ['91311'], 'foothills', ['Stoney Point', 'Indian Hills'], 'Hillside custom homes, equestrian properties, and warehouses near Devonshire each present different mold risks.', ['hillside drainage and slope runoff', 'detached guesthouses with poor ventilation', 'older industrial roofs']),
  C('Encino', 'Los Angeles', 'San Fernando Valley', ['91316', '91436'], 'inland-valley', ['Encino Hills', 'Royal Oaks'], 'Luxury hillside estates, mid-century ranch homes, and high-end condos along Ventura Blvd.', ['hillside seepage', 'irrigation overspray on stucco', 'aging copper plumbing in mid-century homes']),
  C('Granada Hills', 'Los Angeles', 'San Fernando Valley', ['91344'], 'foothills', ['Knollwood', 'Balboa Highlands'], 'Established neighborhoods of 1960s tract homes with shake or composition roofs and original ducting.', ['shake roof leaks', 'attic condensation in winter', 'original galvanized supply lines']),
  C('Lake Balboa', 'Los Angeles', 'San Fernando Valley', ['91406'], 'inland-valley', ['Balboa Park area'], 'Compact post-war homes and dense multifamily buildings near the Sepulveda Basin.', ['high water table near basin', 'irrigation moisture migration', 'crawl space humidity']),
  C('Lake View Terrace', 'Los Angeles', 'San Fernando Valley', ['91342'], 'foothills', ['Hansen Hills', 'Kagel Canyon'], 'Equestrian properties and mid-century ranch homes at the foot of the Verdugo Mountains.', ['canyon runoff', 'detached barns and tack rooms', 'fire-rebuild moisture issues']),
  C('Mission Hills', 'Los Angeles', 'San Fernando Valley', ['91345'], 'inland-valley', ['Brand Park area'], 'Older Spanish revival homes near the San Fernando Mission alongside 1980s townhomes.', ['terra-cotta roof leaks', 'aging tile underlayment', 'shared HVAC in townhomes']),
  C('North Hills', 'Los Angeles', 'San Fernando Valley', ['91343'], 'inland-valley', ['Sepulveda area'], 'Dense apartment stock, post-war homes, and small commercial buildings.', ['high-density apartment shared walls', 'flat-roof drainage', 'original 1950s/60s plumbing']),
  C('North Hollywood', 'Los Angeles', 'San Fernando Valley', ['91601', '91602', '91605', '91606'], 'urban-core', ['NoHo Arts District', 'Valley Village border'], 'Historic bungalows, 1920s duplexes, and modern luxury lofts side by side.', ['old terracotta sewer lines', 'historic stucco moisture issues', 'NoHo loft HVAC condensation']),
  C('Northridge', 'Los Angeles', 'San Fernando Valley', ['91324', '91325', '91326'], 'inland-valley', ['Porter Estates', 'CSUN area'], 'Ranch-style homes, post-Northridge-quake retrofits, and high-density CSUN-adjacent rentals.', ['1994 quake-era retrofit moisture pockets', 'shared rental plumbing', 'attic condensation']),
  C('Pacoima', 'Los Angeles', 'San Fernando Valley', ['91331'], 'inland-valley', ['Hansen Dam area'], 'Mid-century homes, light industrial buildings, and dense rentals.', ['Hansen Dam basin humidity', 'aging stucco', 'commercial flat roofs']),
  C('Panorama City', 'Los Angeles', 'San Fernando Valley', ['91402'], 'inland-valley', ['Van Nuys border'], 'Dense apartment stock, post-war GI homes, and small commercial centers.', ['1950s/60s GI tract plumbing', 'apartment cross-contamination', 'old air duct systems']),
  C('Porter Ranch', 'Los Angeles', 'San Fernando Valley', ['91326'], 'foothills', ['Porter Ridge', 'Sorrento Pointe'], 'Newer master-planned hillside communities, gated luxury homes, and HOA condos.', ['hillside drainage', 'newer home stucco moisture', 'HOA crawl-space shared issues']),
  C('Reseda', 'Los Angeles', 'San Fernando Valley', ['91335'], 'inland-valley', ['Reseda Ranch', 'Sherman Way corridor'], 'Post-war single-family homes and mid-rise apartment buildings.', ['shared plumbing in apartments', 'original galvanized supply', 'attic insulation moisture']),
  C('Sherman Oaks', 'Los Angeles', 'San Fernando Valley', ['91403', '91423'], 'inland-valley', ['Sherman Oaks Hills', 'Chandler Estates'], 'Hillside luxury homes, mid-century ranch, and dense Ventura Blvd condos.', ['hillside seepage', 'condo shared HVAC mold', 'mid-century cast iron drains']),
  C('Studio City', 'Los Angeles', 'San Fernando Valley', ['91604'], 'inland-valley', ['Colfax Meadows', 'Laurel Terrace'], 'Studio-era bungalows, modern luxury rebuilds, and Ventura corridor multifamily.', ['LA river-adjacent humidity', 'original 1930s plumbing', 'remodel-related vapor issues']),
  C('Sun Valley', 'Los Angeles', 'San Fernando Valley', ['91352'], 'inland-valley', ['Stonehurst', 'Sun Valley Village'], 'Industrial buildings, single-family rebuilds, and aging stucco apartments.', ['industrial flat roof issues', 'rebuild stucco moisture', 'old commercial HVAC']),
  C('Sylmar', 'Los Angeles', 'San Fernando Valley', ['91342'], 'foothills', ['Sylmar Park', 'Olive View'], 'Hillside homes, 1970s tract neighborhoods, and equestrian estates.', ['hillside runoff', 'detached structure ventilation', 'wildfire-rebuild moisture']),
  C('Tarzana', 'Los Angeles', 'San Fernando Valley', ['91335', '91356'], 'inland-valley', ['Tarzana Hills', 'Vanalden'], 'Hillside estates, ranch homes, and Ventura Blvd condos.', ['hillside drainage', 'mid-century stucco moisture', 'HOA shared crawl space issues']),
  C('Toluca Lake', 'Los Angeles', 'San Fernando Valley', ['91602'], 'inland-valley', ['Toluca Estates', 'Lakeside'], 'High-end Tudor and Spanish revival homes, mid-century ranch, and lakefront properties.', ['lakefront humidity', 'historic plaster walls', 'aging hidden plumbing']),
  C('Valley Glen', 'Los Angeles', 'San Fernando Valley', ['91401', '91606'], 'inland-valley', ['Valley College area'], 'Mid-century ranch homes and 1970s/80s apartments.', ['shared apartment plumbing', 'original ducting', 'Tujunga Wash humidity']),
  C('Valley Village', 'Los Angeles', 'San Fernando Valley', ['91607'], 'inland-valley', ['Magnolia Woods'], 'Mid-century single-family homes, modern luxury rebuilds, and Magnolia condos.', ['rebuild moisture intrusion', 'condo shared HVAC', 'mid-century galvanized lines']),
  C('Van Nuys', 'Los Angeles', 'San Fernando Valley', ['91401', '91405', '91406', '91411'], 'inland-valley', ['Lake Balboa border', 'Cumberland'], 'Post-war single-family homes, dense apartment corridors, and small commercial.', ['high-density apartment moisture', 'aging plumbing infrastructure', 'commercial flat roofs']),
  C('West Hills', 'Los Angeles', 'San Fernando Valley', ['91307'], 'foothills', ['Valley Circle', 'Roscoe Hills'], 'Hillside custom homes, 1970s tract neighborhoods, and gated communities.', ['hillside drainage', 'wildfire-prone area moisture rebuilds', 'aging tile roofs']),
  C('Winnetka', 'Los Angeles', 'San Fernando Valley', ['91306'], 'inland-valley', ['Winnetka Park'], 'Post-war ranch homes, mid-century apartments, and small commercial.', ['original plumbing in tract homes', 'attic insulation moisture', 'apartment HVAC']),
  C('Woodland Hills', 'Los Angeles', 'San Fernando Valley', ['91364', '91367'], 'foothills', ['Walnut Acres', 'Warner Center'], 'Hillside luxury homes, mid-rise condos in Warner Center, and ranch neighborhoods.', ['hillside seepage', 'high-rise condo HVAC condensation', 'Warner Center commercial roofs']),

  // Greater LA cities
  C('Agoura Hills', 'Los Angeles', 'Conejo Valley', ['91301'], 'foothills', ['Old Agoura', 'Morrison Ranch'], 'Hillside custom homes and master-planned communities at the edge of the Santa Monica Mountains.', ['hillside drainage', 'wildfire rebuilds', 'crawl-space moisture in older Old Agoura homes']),
  C('Alhambra', 'Los Angeles', 'San Gabriel Valley', ['91801', '91803'], 'urban-core', ['Bean Tract', 'Midwick'], 'Historic Craftsman bungalows, 1920s Spanish, and dense apartment corridors.', ['1920s plaster moisture', 'old galvanized plumbing', 'apartment cross-unit issues']),
  C('Arcadia', 'Los Angeles', 'San Gabriel Valley', ['91006', '91007'], 'foothills', ['Upper Rancho', 'Highlands'], 'Luxury estates, mid-century ranch, and modern rebuilds with extensive landscaping.', ['hillside seepage', 'irrigation overspray', 'pool deck moisture migration']),
  C('Artesia', 'Los Angeles', 'Gateway Cities', ['90701'], 'inland-valley', ['Pioneer Blvd corridor'], 'Post-war tract homes, small commercial buildings, and Pioneer Blvd retail.', ['retail flat roofs', 'aging commercial HVAC', 'tract home plumbing']),
  C('Avalon', 'Los Angeles', 'Harbor Area', ['90704'], 'coastal', ['Catalina Island'], 'Catalina Island cottages, hillside homes, and historic structures with high salt-air exposure.', ['salt-air corrosion', 'isolated logistics for repairs', 'high coastal humidity']),
  C('Azusa', 'Los Angeles', 'San Gabriel Valley', ['91702'], 'foothills', ['Rosedale', 'Mountain Cove'], 'Foothill master-planned communities and historic downtown homes.', ['hillside runoff', 'master-planned shared HOA issues', 'older downtown plumbing']),
  C('Baldwin Park', 'Los Angeles', 'San Gabriel Valley', ['91706'], 'inland-valley', ['Morgan Park area'], 'Post-war single-family homes and dense apartment stock.', ['1950s/60s plumbing', 'apartment shared moisture', 'attic insulation']),
  C('Bell', 'Los Angeles', 'Gateway Cities', ['90201'], 'urban-core', ['Bell Gardens border'], 'Older single-family homes, dense apartments, and small commercial.', ['old terracotta sewer lines', 'apartment moisture', 'commercial roofs']),
  C('Bell Gardens', 'Los Angeles', 'Gateway Cities', ['90201'], 'urban-core', ['Eastern Ave corridor'], 'Post-war single-family homes and rental apartments.', ['original plumbing systems', 'apartment shared issues', 'attic moisture']),
  C('Bellflower', 'Los Angeles', 'Gateway Cities', ['90706'], 'inland-valley', ['Bellflower Blvd'], 'Single-family homes, mid-century apartments, and small businesses.', ['mid-century plumbing', 'apartment moisture', 'flat-roof commercial']),
  C('Beverly Hills', 'Los Angeles', 'Westside', ['90210', '90211', '90212'], 'urban-core', ['Beverly Hills Flats', 'Trousdale Estates', 'Beverly Hills Post Office'], 'Estate properties, historic Spanish revival, and luxury condos.', ['hillside drainage in 90210 hills', 'historic plaster walls', 'luxury HVAC condensation']),
  C('Bradbury', 'Los Angeles', 'San Gabriel Valley', ['91008'], 'foothills', ['Bradbury Estates'], 'Gated equestrian estates and luxury custom homes.', ['hillside drainage', 'large-property irrigation moisture', 'equestrian outbuilding humidity']),
  C('Burbank', 'Los Angeles', 'San Fernando Valley', ['91501', '91502', '91504', '91505', '91506'], 'inland-valley', ['Magnolia Park', 'Rancho Equestrian', 'Burbank Hills'], 'Post-war Magnolia Park bungalows, hillside custom homes, and studio-area commercial.', ['hillside seepage', 'historic plumbing', 'studio-area commercial HVAC']),
  C('Calabasas', 'Los Angeles', 'Conejo Valley', ['91302'], 'foothills', ['Calabasas Hills', 'Mountain View Estates'], 'Hillside luxury estates, gated communities, and modern custom homes.', ['hillside drainage', 'wildfire rebuilds', 'large-format HVAC condensation']),
  C('Carson', 'Los Angeles', 'South Bay', ['90745', '90746', '90810'], 'coastal', ['Dominguez Hills', 'Scottsdale'], 'Post-war single-family homes, light industrial, and refinery-adjacent neighborhoods.', ['high water table', 'industrial flat roofs', 'coastal humidity']),
  C('Cerritos', 'Los Angeles', 'Gateway Cities', ['90703'], 'inland-valley', ['Cerritos Towne Center'], 'Master-planned single-family homes, condos, and large commercial centers.', ['HOA shared plumbing', 'commercial flat roofs', 'condo HVAC issues']),
  C('Claremont', 'Los Angeles', 'San Gabriel Valley', ['91711'], 'foothills', ['Claremont Village', 'Padua Hills'], 'Historic Craftsman, college-area homes, and master-planned communities.', ['historic plumbing', 'foothill drainage', 'college rental moisture']),
  C('Commerce', 'Los Angeles', 'Gateway Cities', ['90040'], 'urban-core', ['Citadel area'], 'Predominantly industrial with limited residential pockets.', ['heavy industrial roofs', 'commercial HVAC', 'warehouse condensation']),
  C('Compton', 'Los Angeles', 'Gateway Cities', ['90220', '90221', '90222'], 'urban-core', ['Richland Farms'], 'Post-war single-family homes, multifamily, and light commercial.', ['original 1940s/50s plumbing', 'apartment shared issues', 'commercial roofs']),
  C('Covina', 'Los Angeles', 'San Gabriel Valley', ['91722', '91723', '91724'], 'inland-valley', ['Charter Oak', 'Downtown Covina'], 'Post-war tract homes, historic downtown, and apartment corridors.', ['mid-century plumbing', 'historic moisture', 'apartment cross-contamination']),
  C('Cudahy', 'Los Angeles', 'Gateway Cities', ['90201'], 'urban-core', ['Atlantic Ave corridor'], 'Dense apartment stock and small commercial buildings.', ['high-density moisture', 'apartment shared HVAC', 'commercial flat roofs']),
  C('Culver City', 'Los Angeles', 'Westside', ['90230', '90232'], 'coastal', ['Sunkist Park', 'Carlson Park', 'Studio Village'], 'Mid-century homes, modern luxury condos near Ivy Station, and creative-office buildings.', ['Ballona Creek-adjacent humidity', 'historic studio buildings', 'modern condo HVAC condensation']),
  C('Diamond Bar', 'Los Angeles', 'San Gabriel Valley', ['91765'], 'foothills', ['The Country Estates'], 'Hillside master-planned communities, gated estates, and townhomes.', ['hillside drainage', 'HOA shared issues', 'large-format HVAC']),
  C('Downey', 'Los Angeles', 'Gateway Cities', ['90240', '90241', '90242'], 'inland-valley', ['Old River School', 'Downey Estates'], 'Mid-century ranch homes, post-war single-family, and apartment corridors.', ['original 1950s plumbing', 'apartment moisture', 'attic insulation']),
  C('Duarte', 'Los Angeles', 'San Gabriel Valley', ['91010'], 'foothills', ['Mountain View'], 'Foothill homes, post-war tract neighborhoods, and small commercial.', ['foothill drainage', 'mid-century plumbing', 'commercial roofs']),
  C('El Monte', 'Los Angeles', 'San Gabriel Valley', ['91731', '91732', '91733'], 'inland-valley', ['Mountain View', 'Granada Park'], 'Single-family homes, dense rentals, and industrial corridors.', ['rental moisture issues', 'old commercial roofs', 'shared apartment HVAC']),
  C('El Segundo', 'Los Angeles', 'South Bay', ['90245'], 'coastal', ['Smoky Hollow', 'Old Town'], 'Beach bungalows, Smoky Hollow live/work, and creative-office buildings.', ['coastal salt-air', 'beach-fog moisture', 'creative-office HVAC']),
  C('Gardena', 'Los Angeles', 'South Bay', ['90247', '90248', '90249'], 'coastal', ['Old Town Gardena'], 'Post-war homes, mid-century apartments, and light industrial.', ['coastal humidity', 'aging plumbing', 'industrial roofs']),
  C('Glendale', 'Los Angeles', 'Greater Los Angeles', ['91201', '91202', '91203', '91204', '91205', '91206', '91207', '91208'], 'foothills', ['Adams Hill', 'Verdugo Woodlands', 'Brand Park'], 'Hillside Spanish revivals, mid-century duplexes, and high-rise downtown condos.', ['hillside seepage', 'historic plumbing', 'high-rise HVAC condensation']),
  C('Glendora', 'Los Angeles', 'San Gabriel Valley', ['91740', '91741'], 'foothills', ['Gold Hills', 'Citrus area'], 'Foothill custom homes, historic downtown, and master-planned communities.', ['foothill runoff', 'historic plumbing', 'HOA shared issues']),
  C('Hawaiian Gardens', 'Los Angeles', 'Gateway Cities', ['90716'], 'inland-valley', ['Carson St area'], 'Compact single-family homes and small commercial.', ['mid-century plumbing', 'apartment moisture', 'commercial roofs']),
  C('Hawthorne', 'Los Angeles', 'South Bay', ['90250'], 'coastal', ['Hollyglen', '360 South Bay'], 'Modern townhomes, post-war single-family, and SpaceX-adjacent commercial.', ['coastal humidity', 'modern townhome HVAC', 'commercial flat roofs']),
  C('Hermosa Beach', 'Los Angeles', 'South Bay', ['90254'], 'coastal', ['The Strand', 'Hermosa Hills'], 'Beach bungalows, modern coastal townhomes, and luxury rebuilds.', ['salt-air corrosion', 'sand-pad moisture', 'beach fog']),
  C('Hidden Hills', 'Los Angeles', 'Conejo Valley', ['91302'], 'foothills', ['Long Valley'], 'Gated equestrian luxury estates.', ['large-property drainage', 'equestrian outbuildings', 'luxury HVAC condensation']),
  C('Huntington Park', 'Los Angeles', 'Gateway Cities', ['90255'], 'urban-core', ['Pacific Blvd'], 'Dense single-family homes, apartment corridors, and small commercial.', ['high-density moisture', 'old plumbing', 'commercial roofs']),
  C('Industry', 'Los Angeles', 'San Gabriel Valley', ['91744', '91745', '91746', '91748'], 'inland-valley', ['Industry Hills'], 'Predominantly industrial with limited residential.', ['industrial roofs', 'warehouse HVAC', 'commercial drainage']),
  C('Inglewood', 'Los Angeles', 'South Bay', ['90301', '90302', '90303', '90304', '90305'], 'urban-core', ['Morningside Park', 'Fairview Heights'], 'Historic homes, dense apartments, and modern SoFi-area developments.', ['airport-adjacent vibration cracks', 'historic plumbing', 'apartment moisture']),
  C('Irwindale', 'Los Angeles', 'San Gabriel Valley', ['91706'], 'inland-valley', ['Industrial corridor'], 'Predominantly industrial.', ['industrial flat roofs', 'commercial HVAC', 'warehouse moisture']),
  C('La Cañada Flintridge', 'Los Angeles', 'San Gabriel Valley', ['91011'], 'foothills', ['Flintridge', 'Sleepy Hollow'], 'Hillside luxury estates and historic custom homes.', ['hillside seepage', 'wildfire rebuilds', 'historic plumbing']),
  C('La Habra Heights', 'Los Angeles', 'San Gabriel Valley', ['90631'], 'foothills', ['Hacienda Rd corridor'], 'Hillside custom estates and equestrian properties.', ['hillside drainage', 'large-property irrigation', 'equestrian outbuildings']),
  C('La Mirada', 'Los Angeles', 'Gateway Cities', ['90638'], 'inland-valley', ['Biola area'], 'Master-planned single-family homes and townhomes.', ['HOA shared issues', 'mid-century plumbing', 'apartment moisture']),
  C('La Puente', 'Los Angeles', 'San Gabriel Valley', ['91744', '91746'], 'inland-valley', ['Hacienda Heights border'], 'Post-war single-family homes and dense rentals.', ['original plumbing', 'apartment moisture', 'attic insulation']),
  C('La Verne', 'Los Angeles', 'San Gabriel Valley', ['91750'], 'foothills', ['Live Oak Canyon', 'University area'], 'Foothill homes, historic downtown, and university-area rentals.', ['foothill drainage', 'historic plumbing', 'rental moisture']),
  C('Lakewood', 'Los Angeles', 'Gateway Cities', ['90712', '90713', '90715'], 'inland-valley', ['Lakewood Village'], 'Post-war planned community of nearly identical tract homes.', ['1950s tract plumbing', 'attic insulation moisture', 'shared neighborhood drainage']),
  C('Lancaster', 'Los Angeles', 'Antelope Valley', ['93534', '93535', '93536'], 'high-desert', ['West Lancaster', 'Quartz Hill border'], 'Master-planned single-family homes, older downtown, and commercial corridors.', ['extreme temperature swings causing condensation', 'monsoon flooding', 'wind-driven roof damage']),
  C('Lawndale', 'Los Angeles', 'South Bay', ['90260'], 'coastal', ['Hawthorne Blvd corridor'], 'Post-war single-family and apartment buildings.', ['coastal humidity', 'aging plumbing', 'apartment shared issues']),
  C('Lomita', 'Los Angeles', 'South Bay', ['90717'], 'coastal', ['Pacific Coast Hwy'], 'Post-war homes, small commercial, and rental units.', ['coastal humidity', 'commercial roofs', 'old plumbing']),
  C('Long Beach', 'Los Angeles', 'Harbor Area', ['90802', '90803', '90804', '90805', '90806', '90807', '90808', '90810', '90813', '90814', '90815'], 'coastal', ['Belmont Shore', 'Naples', 'Bixby Knolls', 'Downtown'], 'Historic Craftsman, beach cottages, high-rise condos, and port-adjacent industrial.', ['salt-air corrosion', 'high water table', 'historic plaster walls', 'high-rise HVAC condensation']),
  C('Lynwood', 'Los Angeles', 'Gateway Cities', ['90262'], 'urban-core', ['Long Beach Blvd'], 'Single-family homes, dense apartments, and small commercial.', ['old plumbing', 'apartment moisture', 'commercial roofs']),
  C('Malibu', 'Los Angeles', 'Westside', ['90263', '90265'], 'coastal', ['Point Dume', 'Malibu Colony', 'Big Rock'], 'Beachfront estates, hillside custom homes, and PCH commercial.', ['salt-air', 'hillside slide-zone moisture', 'wildfire rebuilds', 'crawl-space humidity']),
  C('Manhattan Beach', 'Los Angeles', 'South Bay', ['90266'], 'coastal', ['The Strand', 'Tree Section', 'Hill Section'], 'Modern luxury beach homes, beach cottages, and Hill Section custom builds.', ['salt-air', 'sand-pad moisture', 'modern home HVAC condensation']),
  C('Maywood', 'Los Angeles', 'Gateway Cities', ['90270'], 'urban-core', ['Atlantic Blvd'], 'Dense single-family and apartment stock.', ['high-density moisture', 'old plumbing', 'apartment HVAC']),
  C('Monrovia', 'Los Angeles', 'San Gabriel Valley', ['91016'], 'foothills', ['Old Town', 'Monrovia Hills'], 'Historic Craftsman, foothill custom homes, and downtown apartments.', ['hillside drainage', 'historic plumbing', 'apartment moisture']),
  C('Montebello', 'Los Angeles', 'Gateway Cities', ['90640'], 'inland-valley', ['Montebello Hills'], 'Hillside homes, post-war single-family, and dense apartments.', ['hillside drainage', 'mid-century plumbing', 'apartment shared issues']),
  C('Monterey Park', 'Los Angeles', 'San Gabriel Valley', ['91754', '91755'], 'foothills', ['Monterey Hills', 'East LA College area'], 'Hillside custom homes, post-war ranch, and dense rental units.', ['hillside seepage', 'mid-century plumbing', 'apartment moisture']),
  C('Norwalk', 'Los Angeles', 'Gateway Cities', ['90650'], 'inland-valley', ['Cerritos College area'], 'Post-war single-family, apartment corridors, and commercial.', ['mid-century plumbing', 'apartment moisture', 'commercial roofs']),
  C('Palmdale', 'Los Angeles', 'Antelope Valley', ['93550', '93551', '93552'], 'high-desert', ['Rancho Vista', 'East Palmdale'], 'Master-planned single-family homes and commercial centers.', ['extreme temperature swings', 'monsoon flooding', 'wind damage to roofs']),
  C('Palos Verdes Estates', 'Los Angeles', 'South Bay', ['90274'], 'coastal', ['Lunada Bay', 'Malaga Cove'], 'Hillside Spanish revival estates and luxury custom homes.', ['hillside slide-zone moisture', 'salt-air', 'historic plumbing']),
  C('Paramount', 'Los Angeles', 'Gateway Cities', ['90723'], 'inland-valley', ['Hollydale'], 'Post-war single-family and apartment buildings.', ['mid-century plumbing', 'apartment moisture', 'commercial roofs']),
  C('Pasadena', 'Los Angeles', 'San Gabriel Valley', ['91101', '91103', '91104', '91105', '91106', '91107'], 'foothills', ['Bungalow Heaven', 'Old Pasadena', 'San Rafael Hills'], 'Historic Craftsman, Spanish revival, hillside custom homes, and downtown lofts.', ['historic plaster moisture', 'foothill drainage', 'old basements with French drains']),
  C('Pico Rivera', 'Los Angeles', 'Gateway Cities', ['90660'], 'inland-valley', ['Whittier Narrows area'], 'Single-family homes, apartment corridors, and small commercial.', ['high water table near narrows', 'mid-century plumbing', 'apartment moisture']),
  C('Pomona', 'Los Angeles', 'San Gabriel Valley', ['91766', '91767', '91768'], 'inland-valley', ['Phillips Ranch', 'Lincoln Park'], 'Historic downtown, hillside custom homes, and dense apartment corridors.', ['historic plumbing', 'apartment moisture', 'hillside drainage']),
  C('Rancho Palos Verdes', 'Los Angeles', 'South Bay', ['90275'], 'coastal', ['Portuguese Bend', 'Mediterrania'], 'Hillside ocean-view luxury estates and townhome HOAs.', ['hillside slide zones', 'salt-air', 'HOA shared crawl space issues']),
  C('Redondo Beach', 'Los Angeles', 'South Bay', ['90277', '90278'], 'coastal', ['Hollywood Riviera', 'North Redondo'], 'Beach townhomes, modern luxury rebuilds, and Riviera hillside homes.', ['salt-air', 'hillside drainage', 'townhome shared HVAC']),
  C('Rolling Hills', 'Los Angeles', 'South Bay', ['90274'], 'coastal', ['Rolling Hills Estates'], 'Gated equestrian luxury estates with large lots.', ['large-property drainage', 'equestrian outbuildings', 'hillside seepage']),
  C('Rolling Hills Estates', 'Los Angeles', 'South Bay', ['90274'], 'coastal', ['Empty Saddle', 'Rolling Hills Country Club'], 'Hillside luxury homes and HOA townhomes.', ['hillside drainage', 'HOA shared issues', 'salt-air']),
  C('Rosemead', 'Los Angeles', 'San Gabriel Valley', ['91770'], 'inland-valley', ['Garvey Ave corridor'], 'Single-family homes and dense apartment buildings.', ['mid-century plumbing', 'apartment moisture', 'commercial roofs']),
  C('San Dimas', 'Los Angeles', 'San Gabriel Valley', ['91773'], 'foothills', ['Via Verde'], 'Master-planned single-family communities and historic downtown.', ['HOA shared issues', 'mid-century plumbing', 'foothill drainage']),
  C('San Fernando', 'Los Angeles', 'San Fernando Valley', ['91340'], 'inland-valley', ['Mission Hills border'], 'Compact historic homes, post-war single-family, and small commercial.', ['historic plumbing', 'apartment moisture', 'commercial roofs']),
  C('San Gabriel', 'Los Angeles', 'San Gabriel Valley', ['91775', '91776'], 'inland-valley', ['Mission District', 'Las Tunas'], 'Historic homes near the mission, post-war single-family, and apartments.', ['historic plumbing', 'apartment moisture', 'commercial roofs']),
  C('San Marino', 'Los Angeles', 'San Gabriel Valley', ['91108'], 'foothills', ['Huntington Library area'], 'Luxury historic estates, mid-century custom homes, and gated rebuilds.', ['historic plaster moisture', 'large-property drainage', 'HVAC condensation']),
  C('Santa Clarita', 'Los Angeles', 'Santa Clarita Valley', ['91350', '91351', '91354', '91355', '91387', '91390'], 'inland-valley', ['Valencia', 'Saugus', 'Newhall', 'Canyon Country'], 'Master-planned communities, hillside custom homes, and historic Newhall.', ['hillside drainage', 'HOA shared issues', 'wildfire rebuilds']),
  C('Santa Fe Springs', 'Los Angeles', 'Gateway Cities', ['90670'], 'inland-valley', ['Heritage Springs'], 'Predominantly industrial with limited residential.', ['industrial flat roofs', 'commercial HVAC', 'warehouse moisture']),
  C('Santa Monica', 'Los Angeles', 'Westside', ['90401', '90402', '90403', '90404', '90405'], 'coastal', ['North of Montana', 'Sunset Park', 'Ocean Park'], 'Historic Spanish revival, beach bungalows, modern luxury condos.', ['salt-air', 'historic plumbing', 'condo HVAC condensation']),
  C('Sierra Madre', 'Los Angeles', 'San Gabriel Valley', ['91024'], 'foothills', ['Canyon area'], 'Historic Craftsman, foothill custom homes, and canyon properties.', ['canyon drainage', 'historic plaster moisture', 'wildfire rebuilds']),
  C('Signal Hill', 'Los Angeles', 'Harbor Area', ['90755'], 'coastal', ['Signal Hill summit'], 'Hilltop modern townhomes, post-war single-family, and oil-field-adjacent.', ['hillside drainage', 'townhome shared HVAC', 'salt-air']),
  C('South El Monte', 'Los Angeles', 'San Gabriel Valley', ['91733'], 'inland-valley', ['Industrial corridor'], 'Predominantly industrial with limited residential.', ['industrial roofs', 'commercial HVAC', 'warehouse moisture']),
  C('South Gate', 'Los Angeles', 'Gateway Cities', ['90280'], 'urban-core', ['Hollydale border'], 'Single-family homes, dense apartments, and small commercial.', ['old plumbing', 'apartment moisture', 'commercial roofs']),
  C('South Pasadena', 'Los Angeles', 'San Gabriel Valley', ['91030'], 'foothills', ['Mission West', 'Marengo'], 'Historic Craftsman, mid-century homes, and Mission West commercial.', ['historic plumbing', 'foothill drainage', 'apartment moisture']),
  C('Temple City', 'Los Angeles', 'San Gabriel Valley', ['91780'], 'inland-valley', ['Las Tunas Drive'], 'Post-war single-family and small commercial.', ['mid-century plumbing', 'apartment moisture', 'commercial roofs']),
  C('Torrance', 'Los Angeles', 'South Bay', ['90501', '90502', '90503', '90504', '90505'], 'coastal', ['Old Torrance', 'Hollywood Riviera', 'West Torrance'], 'Mid-century homes, modern townhomes, and large commercial.', ['coastal humidity', 'townhome shared HVAC', 'commercial flat roofs']),
  C('Vernon', 'Los Angeles', 'Gateway Cities', ['90058'], 'urban-core', ['Industrial district'], 'Almost exclusively industrial.', ['industrial flat roofs', 'commercial HVAC', 'warehouse moisture']),
  C('Walnut', 'Los Angeles', 'San Gabriel Valley', ['91789'], 'foothills', ['Three Oaks'], 'Master-planned hillside communities and townhomes.', ['hillside drainage', 'HOA shared issues', 'townhome HVAC']),
  C('West Covina', 'Los Angeles', 'San Gabriel Valley', ['91790', '91791', '91792'], 'inland-valley', ['South Hills', 'Eastland'], 'Hillside custom homes, post-war single-family, and apartments.', ['hillside drainage', 'mid-century plumbing', 'apartment moisture']),
  C('West Hollywood', 'Los Angeles', 'Westside', ['90046', '90048', '90069'], 'urban-core', ['Sunset Strip', 'WeHo East'], 'Historic Spanish, mid-century duplexes, and modern luxury condos.', ['historic plumbing', 'condo HVAC condensation', 'mid-century cast iron drains']),
  C('Westlake Village', 'Los Angeles', 'Conejo Valley', ['91361', '91362'], 'foothills', ['North Ranch'], 'Master-planned hillside communities and luxury estates.', ['hillside drainage', 'HOA shared issues', 'large-format HVAC']),
  C('Whittier', 'Los Angeles', 'Gateway Cities', ['90601', '90602', '90603', '90604', '90605', '90606'], 'foothills', ['Uptown Whittier', 'Friendly Hills'], 'Historic Craftsman, hillside custom homes, and apartment corridors.', ['historic plumbing', 'foothill drainage', 'apartment moisture']),

  // Unincorporated LA county / additional
  C('Altadena', 'Los Angeles', 'San Gabriel Valley', ['91001'], 'foothills', ['Christmas Tree Lane', 'Meadows'], 'Historic Craftsman, foothill custom homes, and post-fire rebuilds.', ['foothill drainage', 'historic plumbing', 'wildfire rebuild moisture']),
  C('East Los Angeles', 'Los Angeles', 'Greater Los Angeles', ['90022', '90023'], 'urban-core', ['City Terrace', 'Belvedere'], 'Historic homes, dense apartments, and small commercial.', ['historic plumbing', 'apartment moisture', 'hillside drainage']),
  C('Hacienda Heights', 'Los Angeles', 'San Gabriel Valley', ['91745'], 'foothills', ['Hsi Lai Temple area'], 'Hillside single-family communities and townhomes.', ['hillside drainage', 'HOA shared issues', 'mid-century plumbing']),
  C('Rowland Heights', 'Los Angeles', 'San Gabriel Valley', ['91748'], 'foothills', ['Diamond Bar border'], 'Hillside master-planned communities.', ['hillside drainage', 'HOA shared issues', 'townhome HVAC']),
  C('Valencia', 'Los Angeles', 'Santa Clarita Valley', ['91354', '91355'], 'inland-valley', ['Westridge', 'Tesoro'], 'Master-planned single-family and townhome communities.', ['HOA shared issues', 'newer construction stucco moisture', 'hillside drainage']),
  C('Acton', 'Los Angeles', 'Antelope Valley', ['93510'], 'high-desert', ['Crown Valley'], 'Rural ranch homes and equestrian properties.', ['extreme temperature swings', 'monsoon flooding', 'well-water-related humidity']),
  C('Agua Dulce', 'Los Angeles', 'Antelope Valley', ['91390'], 'high-desert', ['Vasquez Rocks area'], 'Rural ranch and equestrian properties.', ['extreme temperature swings', 'monsoon flooding', 'detached outbuildings']),
  C('Marina del Rey', 'Los Angeles', 'Westside', ['90292'], 'coastal', ['Marina Peninsula'], 'High-rise condos, marina-adjacent townhomes, and luxury rentals.', ['salt-air', 'marina humidity', 'high-rise HVAC condensation']),
  C('Athens', 'Los Angeles', 'South Bay', ['90044'], 'urban-core', ['Athens-on-the-Hill'], 'Compact single-family homes and dense rentals.', ['old plumbing', 'apartment moisture', 'commercial roofs']),
  C('Willowbrook', 'Los Angeles', 'Gateway Cities', ['90222'], 'urban-core', ['MLK Hospital area'], 'Single-family homes and dense apartment stock.', ['old plumbing', 'apartment moisture', 'commercial roofs']),
  C('Stevenson Ranch', 'Los Angeles', 'Santa Clarita Valley', ['91381'], 'foothills', ['Westridge'], 'Master-planned hillside communities.', ['hillside drainage', 'HOA shared issues', 'newer construction moisture']),
  C('Topanga', 'Los Angeles', 'Westside', ['90290'], 'foothills', ['Old Topanga', 'Fernwood'], 'Canyon custom homes, cabins, and hillside rebuilds.', ['canyon drainage', 'wildfire rebuilds', 'crawl-space humidity']),
  C('Ladera Heights', 'Los Angeles', 'Westside', ['90056'], 'urban-core', ['Ladera Heights'], 'Mid-century hillside homes and modern rebuilds.', ['hillside seepage', 'mid-century plumbing', 'rebuild moisture']),
  C('View Park-Windsor Hills', 'Los Angeles', 'Westside', ['90008', '90043'], 'urban-core', ['View Park'], 'Historic Spanish revival and mid-century custom homes.', ['historic plaster moisture', 'hillside drainage', 'mid-century plumbing']),
  C('West Carson', 'Los Angeles', 'South Bay', ['90502'], 'coastal', ['Harbor City border'], 'Post-war single-family and apartment buildings.', ['coastal humidity', 'mid-century plumbing', 'apartment moisture']),
  C('Westmont', 'Los Angeles', 'Gateway Cities', ['90044'], 'urban-core', ['Western Ave corridor'], 'Compact single-family and dense apartments.', ['old plumbing', 'apartment moisture', 'commercial roofs']),

  // Ventura County
  C('Camarillo', 'Ventura', 'Ventura County', ['93010', '93012'], 'coastal', ['Mission Oaks', 'Spanish Hills'], 'Master-planned communities, hillside estates, and Camarillo Heights.', ['marine layer humidity', 'hillside drainage', 'HOA shared issues']),
  C('Fillmore', 'Ventura', 'Ventura County', ['93015'], 'inland-valley', ['Old Town Fillmore'], 'Historic downtown, agricultural-adjacent homes, and ranch properties.', ['agricultural-area humidity', 'historic plumbing', 'flood-zone moisture']),
  C('Moorpark', 'Ventura', 'Ventura County', ['93021'], 'inland-valley', ['Mountain Meadows'], 'Master-planned single-family communities and rural-adjacent estates.', ['HOA shared issues', 'newer construction moisture', 'agricultural-area humidity']),
  C('Ojai', 'Ventura', 'Ventura County', ['93023'], 'foothills', ['East End', 'Meiners Oaks'], 'Historic homes, hillside custom builds, and post-fire rebuilds.', ['valley humidity', 'historic plumbing', 'wildfire rebuild moisture']),
  C('Oxnard', 'Ventura', 'Ventura County', ['93030', '93033', '93035', '93036'], 'coastal', ['Channel Islands', 'River Ridge', 'Oxnard Shores'], 'Beach townhomes, master-planned communities, and historic downtown.', ['salt-air', 'marine layer humidity', 'high water table']),
  C('Port Hueneme', 'Ventura', 'Ventura County', ['93041'], 'coastal', ['Hueneme Beach'], 'Beach cottages, post-war single-family, and naval-base-adjacent.', ['salt-air', 'sand-pad moisture', 'beach fog']),
  C('Ventura', 'Ventura', 'Ventura County', ['93001', '93003', '93004'], 'coastal', ['Downtown Ventura', 'Ondulando', 'Pierpont'], 'Historic downtown, hillside homes, and beach cottages along Pierpont.', ['salt-air', 'hillside drainage', 'historic plumbing']),
  C('Santa Paula', 'Ventura', 'Ventura County', ['93060'], 'inland-valley', ['Old Town Santa Paula'], 'Historic homes, agricultural-area properties, and downtown commercial.', ['agricultural humidity', 'historic plumbing', 'flood-zone moisture']),
  C('Simi Valley', 'Ventura', 'Ventura County', ['93063', '93064', '93065'], 'inland-valley', ['Wood Ranch', 'Big Sky'], 'Master-planned communities, hillside estates, and historic Strathearn area.', ['hillside drainage', 'HOA shared issues', 'wildfire rebuild moisture']),
  C('Thousand Oaks', 'Ventura', 'Conejo Valley', ['91320', '91360', '91362'], 'foothills', ['North Ranch', 'Lynn Ranch', 'Newbury Park'], 'Master-planned hillside communities, luxury estates, and townhome HOAs.', ['hillside drainage', 'HOA shared issues', 'wildfire rebuild moisture']),
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export const allCitySlugs = cities.map((c) => c.slug);

export const citiesByRegion = cities.reduce<Record<string, City[]>>((acc, city) => {
  acc[city.region] = acc[city.region] || [];
  acc[city.region].push(city);
  return acc;
}, {});
