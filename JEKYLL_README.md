# SpicyNoodles - Jekyll + GitHub Pages Setup

This is a Jekyll-based website optimized for GitHub Pages with dynamic product management using Liquid templating and YAML data files.

## 🎨 Features

- **Jekyll Static Site Generator** - Fast, secure, and GitHub Pages native
- **Cayman Theme** - Clean, responsive design
- **Dynamic Product Data** - Managed via `_data/products.yml`
- **Liquid Templates** - Jekyll's native templating engine
- **Brand Colors** - Complete SpicyNoodles color system
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** - Jekyll SEO Tag plugin

## 📁 Project Structure

```
spicynoodles/
├── _config.yml           # Jekyll configuration & brand variables
├── _data/
│   └── products.yml      # Product database (single source of truth)
├── _layouts/
│   ├── default.html      # Base layout
│   ├── product-list.html # Products listing page
│   └── product.html      # Individual product page
├── _includes/            # Reusable components
├── products/
│   ├── index.md          # Products listing
│   ├── current-hot-spicy-noodles/
│   │   ├── index.md      # Product detail page
│   │   └── image.png     # Product image
│   ├── current-2x-spicy-noodles/
│   ├── current-schezwan-instant-noodles/
│   └── current-hot-n-lemon-veggie-soup-noodles/
├── index.md              # Home page
├── Gemfile               # Ruby dependencies
└── JEKYLL_README.md      # This file
```

## 🚀 Quick Start - Local Development

### Prerequisites
- Ruby 2.7+ installed
- Bundler (`gem install bundler`)

### Install Dependencies

```bash
cd spicynoodles
bundle install
```

### Run Local Server

```bash
bundle exec jekyll serve
```

Visit `http://localhost:4000` to see your site.

## 📝 Managing Products

### Add/Edit Products

1. Open `_data/products.yml`
2. Add or modify product entries
3. Jekyll automatically regenerates the site

```yaml
products:
  - id: 5
    title: "New Product Name"
    folder: "new-product-folder"
    brandName: "Yashoda Foods"
    price: 3.00
    heatLevel: 4
    available: true
    # ... more fields
```

### Create Product Page

For a new product:
1. Create folder: `products/new-product-folder/`
2. Create `products/new-product-folder/index.md` with front matter
3. Add product image at `products/new-product-folder/image.png`

## 🎨 Customize Brand Colors

Edit `_config.yml` to change brand colors:

```yaml
brand:
  chili_red: "#D0290A"
  deep_chili: "#8C1A04"
  # ... more colors
```

These variables are available in all Liquid templates as `site.brand.chili_red`, etc.

## 🌐 Deploy to GitHub Pages

### Option 1: Direct GitHub Pages (Recommended)

1. Push to GitHub repository
2. Go to Settings → Pages
3. Set source to `main` branch
4. GitHub automatically builds and deploys

### Option 2: Build & Commit _site

```bash
bundle exec jekyll build
git add _site/
git commit -m "Build site"
git push
```

## 🔧 Liquid Templating Basics

### Accessing Product Data

```liquid
{% for product in site.data.products.products %}
  {{ product.title }}
  {{ product.price }}
  {{ product.heatLevel }}
{% endfor %}
```

### Conditional Rendering

```liquid
{% if product.available %}
  In Stock
{% else %}
  Out of Stock
{% endif %}
```

### Loops

```liquid
{% for i in (1..product.heatLevel) %}
  🌶️
{% endfor %}
```

## 📊 Performance Benefits

- ✅ **Zero Runtime Overhead** - Everything pre-built
- ✅ **Fast CDN Delivery** - Static HTML served globally
- ✅ **SEO Friendly** - Server-rendered HTML
- ✅ **Security** - No backend vulnerabilities
- ✅ **Free Hosting** - GitHub Pages at no cost

## 🔄 Workflow

1. **Edit** `_data/products.yml` with product data
2. **Test** locally with `bundle exec jekyll serve`
3. **Commit & Push** to GitHub
4. **GitHub Pages** automatically builds and deploys
5. **Live** within seconds

## 🐛 Troubleshooting

### Site doesn't build
```bash
bundle exec jekyll clean
bundle exec jekyll build --verbose
```

### CSS not loading
- Ensure `baseurl` in `_config.yml` matches your repository setting
- Check file paths use `/` not `\`

### Products not showing
- Verify `_data/products.yml` syntax (YAML is space-sensitive)
- Check product image paths are correct
- Rebuild with `bundle exec jekyll clean; bundle exec jekyll build`

## 📚 Resources

- [Jekyll Docs](https://jekyllrb.com/docs/)
- [Liquid Template Language](https://shopify.github.io/liquid/)
- [GitHub Pages Guide](https://pages.github.com/)
- [Cayman Theme](https://pages-themes.github.io/cayman/)

## 🎯 Next Steps

- Customize `_config.yml` with your site info
- Add more products to `_data/products.yml`
- Customize layout templates in `_layouts/`
- Add blog posts in `_posts/` (optional)
- Set up custom domain (optional)

---

**Ready to go live?** Push to GitHub and your Jekyll site will automatically deploy! 🚀
