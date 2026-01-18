document.addEventListener('DOMContentLoaded', () => {
// Açılır-Kapanır Kategoriler
document.querySelectorAll('.category-title').forEach(title => {
  title.addEventListener('click', () => {
    const category = title.parentElement;
    category.classList.toggle('active'); // Tıklandığında aç/kapa

    // Diğer kategorileri kapat
    document.querySelectorAll('.category').forEach(otherCategory => {
      if (otherCategory !== category) {
        otherCategory.classList.remove('active');
      }
    });
  });
});
});
// Ana Sütun İçeriğini Değiştir
const contents = {
  'günlük1': '<h3>📅 Ekim 2023</h3><p>Bugün mahzende bir keşif yaptım...</p>',
  'günlük2': '<h3>📅 Kasım 2023</h3><p>Piksellerle dolu bir rüya...</p>',
  'şiir1': '<h3>🔮 Varoluş</h3><pre>Digital bir çağda kaybolmak...</pre>',
  'şiir2': '<h3>🎨 Sanal Renkler</h3><p>Hex kodlarında saklı duygular...</p>'
};

document.querySelectorAll('.sub-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const contentKey = link.getAttribute('data-content');
    document.querySelector('.centerColumn').innerHTML = contents[contentKey];
  });
});
document.addEventListener('DOMContentLoaded', () => {
// Açılır-Kapanır Kategoriler
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.category-title').forEach(title => {
    title.addEventListener('click', (e) => {
      const category = e.target.closest('.category');
      category.classList.toggle('active');
      
      // Diğer kategorileri kapat
      document.querySelectorAll('.category').forEach(other => {
        if (other !== category) other.classList.remove('active');
      });
    });
  });
});
});
document.addEventListener('DOMContentLoaded', () => {
  // Açılır-Kapanır Kategoriler
  document.querySelectorAll('.category-title').forEach(title => {
    title.addEventListener('click', (e) => {
      const category = e.target.closest('.category');
      category.classList.toggle('active');
      
      // Diğer kategorileri kapat
      document.querySelectorAll('.category').forEach(other => {
        if (other !== category) other.classList.remove('active');
      });
    });
  });

  // İçerik Değiştirme
  const contents = {
    'icerik1': '<h3>İçerik 1</h3><p>Pixel denemelerim...</p>',
    'icerik2': '<h3>İçerik 2</h3><img src="pixel-art.gif">'
  };

  document.querySelectorAll('.sub-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector('.centerColumn');
      target.innerHTML = contents[link.dataset.content];
    });
  });
});