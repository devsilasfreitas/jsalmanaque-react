export function formatCode(text, convertOrDesconvert) {
    let replacement;
    let regex;
    if (convertOrDesconvert) {
        regex = /<code (\w+)>\s{0,2}([\s\S]*?)<\/code>/g;
        replacement = (match, language, content) => {
            const spaces = content?.match(/^\s+/)?.[0]?.length;
            const modifiedContent = content?.replace(RegExp(`(?<=^)\\s{0,${spaces}}`, 'g'), '')?.replace(/</g, '&lt;')?.replace(/>/g, '&gt;')?.replace(RegExp(`(?<=\n)\\s{0,${spaces + 1}}`, 'g'), '');
            return `<pre><code class="language-${language}">${modifiedContent}</code></pre>`;
        } 
    } else {
        regex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;
        replacement = (match, language, content) => {
            const modifiedContent = content?.replace(/&lt;/g, '<')?.replace(/&gt;/g, '>');
            return `<code ${language}>\n${modifiedContent}</code>`;
        }
    }
  
    return text?.replace(regex, replacement);
}