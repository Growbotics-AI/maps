import Head from 'next/head'
import Map from '#components/Map'
import Sidebar from '#components/sidebar' // Adjust this path if necessary based on your project structure

const MapPage = () => (
  <div className="flex">
    <Head>
      <title>Local Manufacturing Map | Explore Digital Manufacturing Facilities</title>
      <meta
        property="og:title"
        content="Local Manufacturing Map | Explore Digital Manufacturing Facilities"
        key="title"
      />
      <meta
        name="description"
        content="Visualize and explore key locations of digital manufacturing facilities, assemblers, and local businesses. This interactive map provides insights into the manufacturing ecosystem."
      />
    </Head>
    <Sidebar />
    <div className="flex-1"> {/* This wrapper ensures the map takes the remaining space */}
      <Map />
    </div>
  </div>
)

export default MapPage
