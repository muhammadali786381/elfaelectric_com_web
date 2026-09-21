from bs4 import BeautifulSoup
import json
import sys

def parse_newsroom(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()
    soup = BeautifulSoup(html, 'html.parser')
    
    # In Elementor, posts are usually in some kind of grid or list.
    # Let's just find all images and their nearest headings.
    posts = []
    
    # Let's look for common post containers. Elementor uses .elementor-post
    for post in soup.find_all(class_='elementor-post'):
        title_tag = post.find(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
        title = title_tag.text.strip() if title_tag else ""
        
        img_tag = post.find('img')
        img_url = img_tag['src'] if img_tag and 'src' in img_tag.attrs else ""
        
        date_tag = post.find(class_='elementor-post-date')
        date = date_tag.text.strip() if date_tag else ""
        
        excerpt_tag = post.find(class_='elementor-post__excerpt')
        excerpt = excerpt_tag.text.strip() if excerpt_tag else ""
        
        if title:
            posts.append({
                'title': title,
                'image': img_url,
                'date': date,
                'excerpt': excerpt
            })
    
    return posts

print(json.dumps({
    'newsroom': parse_newsroom('/home/shahmeer/.gemini/antigravity-ide/brain/10dd73a8-170d-4ee4-9fff-de9c928f53d5/.system_generated/steps/87/content.md'),
    'blog': parse_newsroom('/home/shahmeer/.gemini/antigravity-ide/brain/10dd73a8-170d-4ee4-9fff-de9c928f53d5/.system_generated/steps/88/content.md')
}, indent=2))
