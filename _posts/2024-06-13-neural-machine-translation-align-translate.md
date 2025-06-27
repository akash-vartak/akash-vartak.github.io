---
layout: post
title: Neural Machine Translation by Jointly Learning to Align and Translate
description: 
paperurl: https://arxiv.org/pdf/1409.0473
date: 2024-06-13
tags: adversarial-attack
categories: paper-summary
related_posts: true

authors:
  - name: Dzmitry Bahdanau
    affiliations:
      name: Jacobs University Bremen, Germany
  - name: KyungHyun Cho
    affiliations:
      name: Universite de Montreal
  - name: Yoshua Bengio
    affiliations:
      name: Universite de Montreal

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).
toc:
  - name: Paper Abstract
  - name: TL;DR
  - name: Paper Summary

---

## Paper Abstract

Neural machine translation is a recently proposed approach to machine translation. Unlike the traditional statistical machine translation, the neural machine translation aims at building a single neural network that can be jointly tuned to maximize the translation performance. The models proposed recently for neural machine translation often belong to a family of encoder–decoders and encode a source sentence into a fixed-length vector from which a decoder generates a translation. In this paper, we conjecture that the use of a fixed-length vector is a bottleneck in improving the performance of this basic encoder–decoder architecture, and propose to extend this by allowing a model to automatically (soft-)search for parts of a source sentence that are relevant to predicting a target word, without having to form these parts as a hard segment explicitly. With this new approach, we achieve a translation performance comparable to the existing state-of-the-art phrase-based system on the task of English-to-French translation. Furthermore, qualitative analysis reveals that the (soft-)alignments found by the model agree well with our intuition.

---

## TL;DR

First proposed "Attention" - a mechanism that enables a model to selectively attend to only relevant parts of input.

---

## Paper Summary

Most neural translation models (NTM) encode sentence into a fixed length vector and decoder decodes it into target language.

Paper states, that fixed length vectors are the bottleneck. Authors propose a model that can auto serach for important and relevant parts on input that can be useful to predict/generate the target translated word; Without the need to hard encode the complete sentences, including any irrelevancies.

This attention is learnt as a log-probability and is used as 'attention' during inference.

NTM based translation involves a single neural model that reads input and gives output; In place of traditional phrase-based translation models that have individual parts trained separately.

In NTM, the encoder--decoder pairs are separate for each language pair, jointly trained to maximize the probability of correct output.

Encoders encodes into fixed length vector and decoder decodes into translation.

Fixed length vectors are a problem because what if inference time input sentences are longer - then the NTM will not be able to gather all of the sentence's information.

To address this, the paper proposes - joint alignment and translation
 - Alignment - when a target word is generated, the NTM soft-seraches for spefici input sentence embeddings where the most relevant information is concentrated. Alignment means finding liguistically plausible connections/alignments between the input sentence and desired target translation. 
   - Example: `This is a cat -> Ye billi hai.` \(Alligns as: This, cat -> Ye, billi\)
 - Translate - the model then predicts a target words based on these context vectors from the input embedding + all previously generated words.

 This gets rid of fixed length vectors and allows for variable input sentence lengths. It encodes the input sentence into a sequence of vectors and chooses a subset of these vectors adaptively while decoding the translation
