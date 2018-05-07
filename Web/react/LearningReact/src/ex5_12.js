const data = [
    {
        'name': '구운 연어', 
        'ingredients': [
            {'name': '연어', 'amount': 500, 'measurement': 'gram'}, 
            {'name': '잣', 'amount': 1, 'measurement': 'cup'}, 
            {'name': '버터 상추', 'amount': 2, 'measurement': 'cup'}, 
            {'name': '옐로 스쿼시', 'amount': 1, 'measurement': 'count'}, 
            {'name': '올리브 오일', 'amount': 0.5, 'measurement': 'cup'}, 
            {'name': '마늘', 'amount': 3, 'measurement': 'count'}, 
        ], 
        'step': [
            '오븐을 350도로 예열한다.', 
            '유리 베이킹 그릇에 올리브 오일을 두른다.', 
            '연어, 마늘, 잣을 그릇에 담는다.', 
            '오븐에서 15분간 익힌다.', 
            '옐로 스쿼시를 추가하고 다시 30분간 오브에서 익힌다.', 
            '오븐에서 그릇을 꺼내서 15분간 식힌 다음 상추를 곁들여서 내놓는다.'
        ], 
    }, 
    {
        'name': '생선 타코', 
        'ingredients': [
            {'name': '흰살생선', 'amount': 500, 'measurement': 'gram'}, 
            {'name': '치즈', 'amount': 1, 'measurement': 'cup'}, 
            {'name': '아이스버그 상추', 'amount': 2, 'measurement': 'cup'}, 
            {'name': '토마토', 'amount': 2, 'measurement': 'count'}, 
            {'name': '또띠야', 'amount': 3, 'measurement': 'cup'}
        ], 
        'step': [
            '생선을 그릴에 익힌다.', 
            '또띠야 3장 위에 생선을 얹는다.', 
            '또띠야에 얹은 생선 위에 상추, 토마토, 치즈를 얹는다.'
        ]
    }
]

const Recipe = ({name, ingredients, steps}) => 
    <section id={name.toLowerCase().replace(/ /g, '-')}>
        <h1>{name}</h1>
        <ul className='ingredients'>
            {ingredients.map((ingredient, i) =>
                <li key={i}>{ingredient.name}</li>
            )}
        </ul>
        <section className='instructions'>
            <h2>조리 절차</h2>
            {steps.map((step, i)=>
                <p key={i}>{step}</p>
            )}
        </section>
    </section>

const Menu = ({title, recipes}) =>
    <article>
        <header>
            <h1>{title}</h1>
        </header>
        <div className='recipes'>
            {recipes.map((recipes, i) =>
                <Recipe key={i} {...recipe}/>
            )}
        </div>
    </article>

ReactDOM.render(
    <Menu recipes={data} title='맛있는 조리법'/>, 
    document.getElementById('react-container')
);
