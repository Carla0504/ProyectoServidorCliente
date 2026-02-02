<?php
namespace App\Http\Controllers;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; 
class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::orderBy('created_at', 'desc')->limit(5)->get(); //->paginate(10);
        return view('articles.index', compact('articles'));
    }
    public function create()
    {
        return view('articles.create');
    }
    public function store(Request $request)
    {
        Log::info("Prueba de log");
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string|max:255',
            'published_at' => 'nullable|date',
            'author' => 'nullable|string|max:255'
        ]);
        Article::create($data);
        return redirect()->route('articles.index')->with('success', 'Artículo creado.');
    }
    public function show(Article $article)
    {
        return view('articles.show', compact('article'));
    }
    public function edit(Article $article)
    {
        return view('articles.edit', compact('article'));
    }
    public function update(Request $request, Article $article)
    {
        $data = $request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
        'published_at' => 'nullable|date',
        'author' => 'nullable|string|max:255',
        ]);
        $article->update($data);
        return redirect()->route('articles.index')->with('success', 'Artículo actualizado.');
    }
    public function destroy(Article $article)
    {
        $article->delete();
        return redirect()->route('articles.index')->with('success', 'Artículo eliminado.');
    }

    public function listArticlesAPI(Request $request, Article $article)
    {
        //Leer el valor del parámetro q que viene por GET 
        $info = $request->query('q');
        $desde = $request->query('desde');
        $limit = $request->query('limit');

        //var_dump($info); 
        //Devuelva un json con el listado de articulos cuyo título o contenido 
        // contenga el texto almacenado en la variable $info

        //select id, title, content, author from articles 
        //where title like '%$info%'
        // or content like '%$info%'


        if (isset($info)) {
            $articles = Article::query()->
            where('title', 'like', '%'.$info.'%')->
            orwhere('content', 'like', '%'.$info.'%')->
            limit(5)->
            get();
        } else {
            if (!isset($limit) || $limit == 0) {
                $limit = 5;
            }
            $articles = Article::query()->orderByDesc('created_at')->limit($limit)->offset($desde)->get();
        }

        //var_dump($articles); 
        return response()->json($articles);  // echo encode_json($articles)   
    }

    public function getArticleAPI(Request $request, Article $article)
    {
        //var_dump ($request);
        //var_dump ($article);
        $id=$article->id;
        $title=$article->title;
        $content=$article->content;
        $published_at=$article->published_at;
        $author=$article->author;
        $created=$article->created_at;
        /*
                            {
                                "id": 1, 
                                "title": "un título", 
                                "body": "un texto cualquiera para este articulo", 
                                "author": "un autor",
                                "published": "2025-12-27", 
                                "created": "2025-12-01" 
                            }
                        */
        $response = [
            "id" => $id,
            "title" => $title,
            "body" => $content,
            "author" => $author,
            "published" => $published_at,
            "created" => $created
        ];

        echo json_encode($response);

    }
}

