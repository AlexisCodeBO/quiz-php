

function getQuestions(callback){

$.post('check_json_quiz.php', callback);

};

function renderJSON (result, idx){
    return `<div id="question">
    <h2>${result.question}</h2>
    <ul>
    ${result.answers.map(function(item, index){
      return `<li>Respuesta número ${index+1} es ${item}</li>`
    }).join('')}
    </ul>
    <p>La respuesta correcta es la ${Number(result.right_answer)}</p>
    <form id="del" action="delete_question.php" method="POST">
    <input type="hidden" name="id_question" value="${idx}" />
    <input type="submit" class="btn btn-danger" value="Delete" />
    </form>
    </div>
    `;
};

function displayQuestions(data){
    var results = data.map(function(item,index){
       return renderJSON(item, index); 
    });
    $('.js-questions').html(results);
}

// post new question

function postQuestion(){
  
    $(document).on('submit','#qform',function(event){
        event.preventDefault();
        $.post("create_quiz_op.php", $('#qform').serialize(), displayQuestions);
		$('#qform')[0].reset();
        //getQuestions(displayQuestions);
		
    });
    
}
// add answers to the question

function addAnswers(){
    $('.add-answer').on('click',function(e){ //on add input button click
        e.preventDefault();
         var field = '<div class="form-group list-group-item">'+
        '<li><input class="form-control" type="text" name="answers[]" required/></li>' +
        '</div>';
         $('.append').append(field);
});
}

function delAnswers(){
    $('.del-answer').on('click',function(e){ //on add input button click
        e.preventDefault();
         var field = '<div class="form-group">'+
        '<input class="form-control" type="text" name="answers[]" required/>' +
        '</div>';
         $('.append').children('div').last().remove();
});
}

$(function(){
	$.ajaxSetup({
        data: window.csrf
    });
    getQuestions(displayQuestions);
    postQuestion(getQuestions(displayQuestions));
    addAnswers();
    delAnswers();
});

