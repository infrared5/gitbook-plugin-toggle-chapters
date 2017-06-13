require(['gitbook', 'jQuery'], function(gitbook, $) {

  var oldHash = location.hash

  function expand(chapter) {
    chapter.show()

    var $parent = chapter.parent()
    var parent = $parent.get(0)
    var isSummaryOrBookSummary = parent && (parent.classList.contains('summary') || parent.classList.contains('book-summary'))

    if (isSummaryOrBookSummary && chapter.length) {
      expand($parent)
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
