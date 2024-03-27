export function formatCode(text, convertOrDesconvert) {
    let replacement;
    let regex;
    if (convertOrDesconvert) {
      regex = /<code (\w+)>\n([\s\S]*?)<\/code>/g;
      replacement = (match, language, content) => {
            const modifiedContent = content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return `<pre><code class="language-${language}">${modifiedContent}</code></pre>`;
        } 
    } else {
      regex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;
          replacement = (match, language, content) => {
            const modifiedContent = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            return `<code ${language}>\n${modifiedContent}</code>`;
        }
    }
  
    return text?.replace(regex, replacement);
}