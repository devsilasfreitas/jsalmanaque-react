export const createCopyCode = (text) => {
    const regex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;
    const replacement = (match,language, content) => {
        const modifiedContent = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        return `<div class="code-container">
            <div class="copy-code-container">
                <span class="language">${language}</span>
                <button class="copy-code" data-code='${modifiedContent.replace(/'/g, "\"")}'>Copiar</button>
            </div>
            <pre><code class="language-${language}">${modifiedContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        </div>`;
    };
    return text?.replace(regex, replacement);
}