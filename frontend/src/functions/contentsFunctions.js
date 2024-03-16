export const contentsFunctions = (contents) => {
    const getLanguages = () => {
        const languages = [];
        contents?.map((content) => {
            if (!languages.includes(content.language)) {
                languages.push(content.language)
            }
            return;
        })
        return languages;
    };

    const getModules = (language) => {
        const modules = [];
        const modulesByLanguage = contents?.filter((content) => content.language == language);
        modulesByLanguage?.map((content) => {
            if (!modules.includes(content.module)) modules.push(content.module);
        });

        return modules;
    }

    const getAllModules = () => {
        const modules = [];
        contents?.map((content) => {
            if (!modules.includes(content.module)) modules.push(content.module)
        });
        return modules;
    }

    const getTitles = (language, module) => {
        const titles = [];
        const titlesByModule = contents?.filter((content) => content.language == language).filter((content) => content.module == module);
        titlesByModule?.map((content) => {
            if (!titles.includes(content.title)) titles.push(content.title);
        });
        
        return titles;
    }

    const getAllTitles = () => {
        const titles = [];
        contents?.map((content) => {
            if (!titles.includes(content.title)) titles.push(content.title);
        });
        return titles;
    }

    return {getLanguages, getModules, getTitles, getAllModules, getAllTitles}
}
