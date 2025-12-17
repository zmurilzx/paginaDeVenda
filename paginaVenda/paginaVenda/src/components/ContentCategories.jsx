import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const TabsComponent = () => {
  const filmes = [
    { name: "Oppenheimer", image: "https://uauposters.com.br/media/catalog/product/1/5/158720240305-uau-posters-oppenheimer-filmes-2.jpg" },
    { name: "Barbie", image: "https://i.ebayimg.com/images/g/gpoAAOSw1DpkwSE-/s-l1200.jpg" },
    { name: "Duna 2", image: "https://a-static.mlcdn.com.br/1500x1500/poster-cartaz-duna-parte-2-c-pop-arte-poster/poparteskins2/pos-03531-60x90cm/d57650f6d2fb377930267ac06d1f2754.jpeg" },
    { name: "Tudo em Todo Lugar ao Mesmo Tempo", image: "https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg" },
    { name: "John Wick  4", image: "https://posterspy.com/wp-content/uploads/2022/07/dfthfthj.jpg" },
    { name: "Homem-Aranha: Através do Aranhaverso", image: "https://cdn.awsli.com.br/2500x2500/1610/1610163/produto/217242163/poster-homem-aranha-atraves-do-aranhaverso-b-f528852f.jpg" },
    { name: "Napoleão", image: "https://a-static.mlcdn.com.br/800x560/poster-cartaz-napoleao-a-pop-arte-poster/poparteskins2/pos-03403-40x60cm/dd26b45209e184cc949643b58211c981.jpeg" },
    { name: "The Batman", image: "https://uauposters.com.br/media/catalog/product/2/5/258920220222-uau-posters-the-batman-filmes-2.jpg" },
    { name: "Guardiões da Galáxia 3", image: "https://m.media-amazon.com/images/M/MV5BZWE2MTA1Y2QtMDc1Ni00ODZhLTg1MTYtMTQ1ZGJlMDBmYmIyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { name: "Resistência (The Creator)", image: "https://media.fstatic.com/d3jmVdphCGq1sJAztLBgT98YFgI=/322x478/smart/filters:format(webp)/media/movies/covers/2023/05/thecreator.png" },
    { name: "Invocação do Mal", image: "https://br.web.img2.acsta.net/pictures/210/166/21016629_2013062820083878.jpg" },
    { name: "Velozes & Furiosos 9", image: "https://www.quadrorama.com.br/wp-content/uploads/2022/06/Velozes-e-Furiosos-9-334e7e9b.png" },
    { name: "Matrix", image: "https://ae01.alicdn.com/kf/S9a0165f09392402f910305c74657e1622.jpg" },
    { name: "Alien", image: "https://cdn.cineart.com.br/vibezz_269764329.jpeg" },
    { name: "Chico Bento", image: "https://www.claquete.com.br/fotos/filmes/poster/14168_grande.jpg" },
    { name: "A Fera", image: "https://br.web.img2.acsta.net/pictures/22/07/14/15/49/5560820.jpg" }
  ];
  const series = [
    { name: "The Last of Us", image: "https://br.web.img3.acsta.net/pictures/22/11/30/19/53/5856320.jpg" },
    { name: "Succession", image: "https://m.media-amazon.com/images/M/MV5BZjZhZDc4N2QtZTEzYS00ZmY5LWE2ODctYTA0MWRjMDBmZTFiXkEyXkFqcGc@._V1_.jpg" },
    { name: "Stranger Things", image: "https://m.media-amazon.com/images/M/MV5BMjg2NmM0MTEtYWY2Yy00NmFlLTllNTMtMjVkZjEwMGVlNzdjXkEyXkFqcGc@._V1_.jpg" },
    { name: "The Bear", image: "https://upload.wikimedia.org/wikipedia/pt/a/af/The_Bear_%28s%C3%A9rie_de_televis%C3%A3o%29.png" },
    { name: "Wednesday", image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1b9a551a-0102-4cbd-91d0-292a58acd680/dfr25s3-7d0b324f-10c4-4d95-9ab5-16453390c162.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFiOWE1NTFhLTAxMDItNGNiZC05MWQwLTI5MmE1OGFjZDY4MFwvZGZyMjVzMy03ZDBiMzI0Zi0xMGM0LTRkOTUtOWFiNS0xNjQ1MzM5MGMxNjIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.lZlPY_yRy8OWxN4cgZkKU79_9U5QqHZXZUsXfe0jT2g" },
    { name: "House of the Dragon", image: "https://uauposters.com.br/media/catalog/product/8/9/896320221026-uau-posters-house-of-the-dragon-casa-do-dragao-series-seriados-2.jpg" },
    { name: "The Boys", image: "https://uauposters.com.br/media/catalog/product/9/0/901020221026-uau-posters-the-boys-series-2.jpg" },
    { name: "Bridgerton", image: "https://m.media-amazon.com/images/I/81nnLGxKFkL._AC_UF894,1000_QL80_.jpg" },
    { name: "Lost", image: "https://uauposters.com.br/media/catalog/product/cache/1/thumbnail/800x930/9df78eab33525d08d6e5fb8d27136e95/0/9/099720140426-posters-series-lost-y1-prm-poster-l.jpg" },
    { name: "Euphoria", image: "https://www.postersplug.com/cdn/shop/products/euphoria-show-logo-poster-607245_grande.jpg?v=1692899019" },
    { name: "Breaking Bad", image: "https://rukminim2.flixcart.com/image/850/1000/kdga1zk0/poster/2/p/i/large-breakingbad04-breaking-bad-poster-breaking-bad-series-original-imafuc2fvfjyackz.jpeg?q=90&crop=false" },
    { name: "The Office (US)", image: "https://m.media-amazon.com/images/I/615MPacH9qL._AC_UF894,1000_QL80_.jpg" },
    { name: "Peaky Blinders", image: "https://uauposters.com.br/media/catalog/product/cache/1/thumbnail/800x930/9df78eab33525d08d6e5fb8d27136e95/2/0/201906131269-uau-posters-series-seriado-peaky-blinders.jpg" },
    { name: "Dark", image: "https://uauposters.com.br/media/catalog/product/cache/1/thumbnail/800x930/9df78eab33525d08d6e5fb8d27136e95/5/2/526620201013-uau-posters-series-dark.jpg" },
    { name: "Friends", image: "https://www.closeup-shop.com/media/oart_0/oart_f/oart_13975/1269486_G429780.JPG" },
    { name: "Lucifer", image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b896a83f-0121-45b5-b482-72d60cc01377/daow6qc-30f4bac8-0fdf-4b96-855d-ac2901c9f35a.jpg/v1/fill/w_1024,h_1517,q_75,strp/lucifer_poster_by_letydb_daow6qc-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTUxNyIsInBhdGgiOiJcL2ZcL2I4OTZhODNmLTAxMjEtNDViNS1iNDgyLTcyZDYwY2MwMTM3N1wvZGFvdzZxYy0zMGY0YmFjOC0wZmRmLTRiOTYtODU1ZC1hYzI5MDFjOWYzNWEuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ._k43nHBrH83LGbksnzcHccIift2mQnW7p41zAorF3sk" }
  ];
  

  return (
    <Tabs defaultValue="filmes" className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="filmes" className="text-sm md:text-base">Filmes</TabsTrigger>
        <TabsTrigger value="series" className="text-sm md:text-base">Séries</TabsTrigger>
      </TabsList>
      <TabsContent value="filmes" className="mt-0">
        <ContentGrid
          categories={[{ name: "", items: filmes }]}
        />
      </TabsContent>
      <TabsContent value="series" className="mt-0">
        <ContentGrid
          categories={[{ name: "", items: series }]}
        />
      </TabsContent>
    </Tabs>
  );
};

const ContentGrid = ({ categories }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = {
    mobile: 2,
    tablet: 4,
    desktop: 6
  };
  
  const items = categories[0]?.items || [];
  const totalPages = Math.ceil(items.length / itemsPerPage.desktop);
  
  const getCurrentItems = () => {
    const start = currentPage * itemsPerPage.desktop;
    return items.slice(start, start + itemsPerPage.desktop);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        {/* Botão Anterior */}
        <button
          onClick={prevPage}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 hover:bg-white border border-purple-200 rounded-full p-2 md:p-3 shadow-lg transition-all hover:scale-110 hidden md:flex items-center justify-center"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
        </button>

        {/* Carrossel */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
            >
              {getCurrentItems().map((item, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="content-card group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    <img
                      className="w-full h-64 md:h-72 lg:h-80 object-cover"
                      alt={`${item.name} miniatura`}
                      src={item.image}
                    />
                    <div className="content-overlay">
                      <h4 className="font-medium text-sm md:text-base text-white">{item.name}</h4>
                    </div>
                    {/* Borda de destaque no hover */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-400 rounded-lg transition-all"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Botão Próximo */}
        <button
          onClick={nextPage}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 hover:bg-white border border-purple-200 rounded-full p-2 md:p-3 shadow-lg transition-all hover:scale-110 hidden md:flex items-center justify-center"
          aria-label="Próximo"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
        </button>
      </div>

      {/* Indicadores de página (dots) */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`transition-all rounded-full ${
              currentPage === index
                ? 'w-8 h-2 bg-gradient-to-r from-purple-600 to-pink-600'
                : 'w-2 h-2 bg-purple-200 hover:bg-purple-300'
            }`}
            aria-label={`Ir para página ${index + 1}`}
          />
        ))}
      </div>

      {/* Navegação mobile (setas embaixo) */}
      <div className="flex md:hidden items-center justify-center gap-4 mt-4">
        <button
          onClick={prevPage}
          className="bg-white border border-purple-200 rounded-full p-2 shadow-md active:scale-95 transition-transform"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 text-purple-600" />
        </button>
        <span className="text-sm text-foreground/60 font-medium">
          {currentPage + 1} / {totalPages}
        </span>
        <button
          onClick={nextPage}
          className="bg-white border border-purple-200 rounded-full p-2 shadow-md active:scale-95 transition-transform"
          aria-label="Próximo"
        >
          <ChevronRight className="w-5 h-5 text-purple-600" />
        </button>
      </div>
    </div>
  );
};

export default TabsComponent;
