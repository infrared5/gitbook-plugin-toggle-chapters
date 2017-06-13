require(['gitbook', 'jQuery'], function(gitbook, $) {

  var oldHash = location.hash

  function expand(chapter) {
    chapter.show()

    var parent = chapter.parent()
    var clzz = parent.attr('class')
    if (clzz !== 'summary' && clzz !== 'book-summary' && chapter.length) {
      expand(parent)
    }
  }

  function onChange() {
    $('li.chapter').children('ul.articles').hide()

    var $chapter = $('li.chapter.active')
    var $children = $chapter.children('ul.articles')

    expand($chapter)

    $children.length && $children.show()
  }

  function recurringCheckForHashChange() {
    var newHash = location.hash

    if (newHash !== oldHash) {
      oldHash = newHash

      onChange()
    }

    requestAnimationFrame(recurringCheckForHashChange)
  }

  gitbook.events.bind('page.change', onChange)
  recurringCheckForHashChange()

})
