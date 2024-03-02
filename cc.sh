name="${1}Component"

touch "src/components/${name}.css" 
echo \
"import './${name}.css'

const ${name} = ({}) => {
    return <>
    
    </>
};

export default ${name};

" >> "src/components/${name}.jsx"