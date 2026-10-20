# Related work leads

Compiled 2026-10-20. Every entry below was checked by opening a page for it (arXiv abs page, proceedings page, ACL Anthology, CVPR/ICML/ICLR/NeurIPS site, or a Crossref record) during this pass. Where a publisher page refused the fetch (HTTP 403), the entry says so and rests on the page that did open. Nothing here comes from memory alone. Venue claims are only the ones a page showed me.

Main list is 18 items, grouped by the six threads. A reserve list follows, also opened, for if a section needs more.

## 1. LLM-as-a-judge reliability and bias

**zheng2023judge**
Zheng, L., Chiang, W.-L., Sheng, Y., Zhuang, S., Wu, Z., Zhuang, Y., Lin, Z., Li, Z., Li, D., Xing, E. P., Zhang, H., Gonzalez, J. E., Stoica, I. (2023). Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena. NeurIPS 2023 Datasets and Benchmarks Track. arXiv:2306.05685.
https://arxiv.org/abs/2306.05685
Why: the standard reference for using a strong model as a scorer, and for naming its known biases. Anchors our director model as a judge and the caveat that its scores are not ground truth.

**chen2024mllmjudge**
Chen, D., Chen, R., Zhang, S., Wang, Y., Liu, Y., Zhou, H., Zhang, Q., Wan, Y., Zhou, P., Sun, L. (2024). MLLM-as-a-Judge: Assessing Multimodal LLM-as-a-Judge with Vision-Language Benchmark. Proceedings of the 41st ICML, PMLR 235, pp. 6562-6595. arXiv:2402.04788.
https://proceedings.mlr.press/v235/chen24h.html
Why: the vision-capable version of the same question. Per the arXiv abstract, multimodal judges track humans in pairwise comparison but diverge on scoring, and still show bias and inconsistency. Our director scores screenshots against a rubric, which is the weaker setting.

## 2. Self-correction, and loops with external feedback

**huang2024selfcorrect**
Huang, J., Chen, X., Mishra, S., Zheng, H. S., Yu, A. W., Song, X., Zhou, D. (2024). Large Language Models Cannot Self-Correct Reasoning Yet. ICLR 2024. arXiv:2310.01798.
https://arxiv.org/abs/2310.01798
Why: the main negative result. Models asked to fix their own answers without outside feedback often do not improve and sometimes get worse. Our proof-off arm is that situation (director only), the proof-on arm adds an external signal.

**gou2024critic**
Gou, Z., Shao, Z., Gong, Y., Shen, Y., Yang, Y., Duan, N., Chen, W. (2024). CRITIC: Large Language Models Can Self-Correct with Tool-Interactive Critiquing. ICLR 2024 (venue as listed on the arXiv page). arXiv:2305.11738.
https://arxiv.org/abs/2305.11738
Why: closest in spirit to the intervention. A tool checks the output and the model revises against the tool's result. Our renderer is the tool, and the checked properties are pixels and layout instead of facts or code.

**madaan2023selfrefine**
Madaan, A., Tandon, N., Gupta, P., et al. (2023). Self-Refine: Iterative Refinement with Self-Feedback. Advances in Neural Information Processing Systems 36 (NeurIPS 2023). DOI 10.52202/075280-2019. arXiv:2303.17651.
https://proceedings.neurips.cc/paper_files/paper/2023/hash/91edff07232fb1b55a505a9e9f6c0ff3-Abstract.html
Why: the generate, critique, revise loop with one model in all three roles. Our proof-off arm is a variant of it with a separate director.

**shinn2023reflexion**
Shinn, N., Cassano, F., Gopinath, A., Narasimhan, K., Yao, S. (2023). Reflexion: Language Agents with Verbal Reinforcement Learning. Advances in Neural Information Processing Systems 36 (NeurIPS 2023). DOI 10.52202/075280-0377. arXiv:2303.11366. (The proceedings page omits a co-author that the arXiv version lists, so check the PDF before printing the author list.)
https://proceedings.neurips.cc/paper_files/paper/2023/hash/1b44b878bb782e6954cd888628510e90-Abstract.html
Why: feedback signals turned into text that the next attempt reads. Our proof step does that too, the failing axis comes back as a line of text to the builder.

## 3. Vision-language models missing low-level visual detail

**tong2024eyes**
Tong, S., Liu, Z., Zhai, Y., Ma, Y., LeCun, Y., Xie, S. (2024). Eyes Wide Shut? Exploring the Visual Shortcomings of Multimodal LLMs. CVPR 2024. arXiv:2401.06209.
https://arxiv.org/abs/2401.06209
Why: shows multimodal models fail on simple visual patterns that humans see at once, traced to the vision encoder. Motivates why a screenshot-reading director can miss a few pixels of overflow.
(CVPR 2024 listing confirmed at https://cvpr.thecvf.com/virtual/2024/poster/30013.)

**rahmanzadehgervi2024blind**
Rahmanzadehgervi, P., Bolton, L., Taesiri, M. R., Nguyen, A. T. (2024). Vision language models are blind: Failing to translate detailed visual features into words. ACCV 2024, pp. 18-34 (venue from the CVF open-access listing as shown in a search result, that page returned 403 to my fetch). arXiv:2407.06581.
https://arxiv.org/abs/2407.06581
Why: simple geometry tasks (lines, overlaps, counts) that VLMs get wrong. Overlap and alignment are exactly what the overflow and safe-zone checks measure.

**xiang2026uilens**
Xiang, W., Wu, Y., Chen, X., Li, X., Chen, S. (2026). UI-Lens: Assessing General MLLMs' Potential to Automate UI Display Quality Assurance. CVPR 2026.
https://cvpr.thecvf.com/virtual/2026/poster/38861
Why: the most direct evidence for our setting. Per the page, 10 models on 4,759 UI pages, task-average F1 of 20.36% for text overflow and 31.21% for container overlap, described as near random for boundary-sensitive defects. The CVF open-access page returned 403, so I only read the CVPR virtual page.

## 4. LLM generation and evaluation of UI and web design

**si2025design2code**
Si, C., Zhang, Y., Li, R., Yang, Z., Liu, R., Yang, D. (2025). Design2Code: Benchmarking Multimodal Code Generation for Automated Front-End Engineering. Proceedings of NAACL 2025 (Long Papers), pp. 3956-3974. DOI 10.18653/v1/2025.naacl-long.199. arXiv:2403.03163.
https://aclanthology.org/2025.naacl-long.199/
Why: baseline benchmark for screenshot to HTML. Its metrics are similarity to a reference, ours are rule checks on a free-form brief, which is a different target worth saying out loud.

**duan2024uicrit**
Duan, P., Cheng, C.-Y., Li, G., Hartmann, B., Li, Y. (2024). UICrit: Enhancing Automated Design Evaluation with a UI Critique Dataset. Proceedings of the 37th ACM UIST. DOI 10.1145/3654777.3676381. arXiv:2407.08850. (The arXiv listing spells the second author Chin-yi Chen, the Crossref record says Chin-Yi Cheng, use the Crossref spelling.)
https://arxiv.org/abs/2407.08850
Why: LLM design critique grounded in human designer critiques. Closest prior work to the director half of our loop.

**sansford2026vision**
Sansford, H., Law, D. H. C., Liu, W., Tripathi, A., Agarwal, N., van den Burg, G. J. J. (2026). Vision-Guided Iterative Refinement for Frontend Code Generation. ICLR 2026 Workshop on AI with Recursive Self-Improvement. arXiv:2604.05839.
https://arxiv.org/abs/2604.05839
Why: a VLM critic on rendered pages feeding repeated refinement cycles, gains of up to 17.8% over three cycles on WebDev Arena requests per the abstract. Workshop paper, so cite it as such. Same loop as our proof-off arm, and the abstract describes no deterministic check.

**lu2025webgenagent**
Lu, Z., Ren, H., Yang, Y., Wang, K., Zong, Z., Pan, J., Zhan, M., Li, H. (2025). WebGen-Agent: Enhancing Interactive Website Generation with Multi-Level Feedback and Step-Level Reinforcement Learning. arXiv:2509.22644 (preprint, no venue on the page).
https://arxiv.org/abs/2509.22644
Why: screenshot feedback from a VLM plus a GUI agent that tests function, with backtracking and select-best. Raises Claude-3.5-Sonnet from 26.4% to 51.9% on WebGen-Bench per the abstract. Shows that feedback loops in this space are typically model-judged.

## 5. Automated accessibility and layout checks in practice

**calo2026semantic**
Calò, T., Gurita, A.-E., De Russis, L. (2026). Measuring the Semantic Accessibility Gap in LLM-Generated Web UIs. Extended Abstracts of CHI 2026, Barcelona. DOI 10.1145/3772363.3799364.
https://doi.org/10.1145/3772363.3799364
Opened through the Politecnico di Torino repository (https://iris.polito.it/handle/11583/3008330) plus the Crossref record. ACM DL itself was not opened.
Why: 300 LLM-generated UIs from three commercial models, 541 semantic violations that syntax-level automated tools can miss, LLM judge recall 80 to 92% under fault injection. The page does not name axe-core, so do not say it does. Useful for the limit of our checker: it covers pixels and rules, not meaning.

**alshayban2020accessibility**
Alshayban, A., Ahmed, I., Malek, S. (2020). Accessibility issues in Android apps: state of affairs, sentiments, and ways forward. Proceedings of ICSE 2020. DOI 10.1145/3377811.3380392.
https://doi.org/10.1145/3377811.3380392
Crossref record opened. The prevalence finding (nearly all of 1,000+ apps have accessibility issues) is from the ICSE 2020 program and NSF PAR search results, not from the ACM page.
Why: evidence that accessibility defects are common and mostly left in by developers, which is why a mechanical check is cheap to justify. Mobile, not web, so say so.

**walsh2017layout**
Walsh, T. A., Kapfhammer, G. M., McMinn, P. (2017). Automated layout failure detection for responsive web pages without an explicit oracle. Proceedings of ISSTA 2017, pp. 192-202. DOI 10.1145/3092703.3092712.
https://eprints.whiterose.ac.uk/id/eprint/116989/
Why: deterministic detection of layout failures in rendered pages, found failures in 16 of 26 production pages. The software-testing precedent for a pixel and layout check standing in for a human eye.

## 6. Multi-agent and role-based generation with a critic

**hong2024metagpt**
Hong, S., Zhuge, M., Chen, J., Zheng, X., Cheng, Y., Wang, J., Zhang, C., Wang, Z., Yau, S., Lin, Z., Zhou, L., Ran, C., Xiao, L., Wu, C., Schmidhuber, J. (2024). MetaGPT: Meta Programming for A Multi-Agent Collaborative Framework. ICLR 2024. arXiv:2308.00352.
https://proceedings.iclr.cc/paper_files/paper/2024/hash/6507b115562bb0a305f1958ccc87355a-Abstract-Conference.html
Why: role-split pipeline with intermediate checks by agents. Our builder, director, renderer split is the same idea with one role made non-LLM.

**pang2025paper2poster**
Pang, W., Lin, K. Q., Jian, X., He, X., Torr, P. (2025). Paper2Poster: Towards Multimodal Poster Automation from Scientific Papers. arXiv:2505.21497 (preprint, v2 30 Oct 2025, no venue on the page).
https://arxiv.org/abs/2505.21497
Why: PosterAgent has a render-and-critique loop with a VLM commenter that fixes overflow and alignment, per the abstract and search summary. The nearest layout-heavy design agent to ours, and a good test of whether "VLM commenter catches overflow" holds up.

---

## Reserve list (opened, not in the main 18)

- **wang2024fair**: Wang, P., Li, L., Chen, L., Cai, Z., Zhu, D., Lin, B., Cao, Y., Kong, L., Liu, Q., Liu, T., Sui, Z. (2024). Large Language Models are not Fair Evaluators. ACL 2024, pp. 9440-9450, DOI 10.18653/v1/2024.acl-long.511. https://aclanthology.org/2024.acl-long.511/ (position bias in pairwise judging)
- **panickssery2024self**: Panickssery, A., Bowman, S. R., Feng, S. (2024). LLM Evaluators Recognize and Favor Their Own Generations. arXiv:2404.13076, preprint only on the page. https://arxiv.org/abs/2404.13076 (matters if builder and director share a model family)
- **xu2024pride**: Xu, W., Zhu, G., Zhao, X., Pan, L., Li, L., Wang, W. Y. (2024). Pride and Prejudice: LLM Amplifies Self-Bias in Self-Refinement. arXiv:2402.11436, preprint only on the page. https://arxiv.org/abs/2402.11436 (self-bias grows across refinement rounds, external feedback reduces it)
- **kamoi2024when**: Kamoi, R., Zhang, Y., Zhang, N., Han, J., Zhang, R. (2024). When Can LLMs Actually Correct Their Own Mistakes? A Critical Survey of Self-Correction of LLMs. TACL 12:1417-1440, DOI 10.1162/tacl_a_00713. https://aclanthology.org/2024.tacl-1.78/ (self-correction works with reliable external feedback)
- **li2025relook**: Li, Y., Zhang, C., Lv, R., Liu, A., Deng, K., Zhang, Y., Liu, J., Zhou, W., Zhou, B. (2025). ReLook: Vision-Grounded RL with a Multimodal LLM Critic for Agentic Web Coding. arXiv:2510.11498, preprint. https://arxiv.org/abs/2510.11498 (a later revision can be worse despite good feedback, handled by keeping only strictly improving steps, and zero reward for code that fails to render)
- **li2026mmwebagent**: Li, Y. et al. (2026). MM-WebAgent: A Hierarchical Multimodal Web Agent for Webpage Generation. arXiv:2604.15309, preprint. https://arxiv.org/abs/2604.15309
- **jeon2025wiserui**: Jeon, J., Kim, M. S., Yoon, J. H., Shim, S., Choi, Y., Kim, H., Kim, D. H., Yu, Y. (2025). Do MLLMs Capture How Interfaces Guide User Behavior? A Benchmark for Multimodal UI/UX Design Understanding (WiserUI-Bench). arXiv:2505.05026, ACL 2026 Main per the page's comment field. https://arxiv.org/abs/2505.05026
- **li2024sketch2code**: Li, R., Zhang, Y., Yang, D. (2024). Sketch2Code: Evaluating Vision-Language Models for Interactive Web Design Prototyping. arXiv:2410.16232, preprint. https://arxiv.org/abs/2410.16232
- **qian2024chatdev**: Qian, C. et al. (2024). ChatDev: Communicative Agents for Software Development. ACL 2024, pp. 15174-15186, DOI 10.18653/v1/2024.acl-long.810. https://aclanthology.org/2024.acl-long.810/
- **zhang2025postergen**: Zhang, Z., Zhang, X., Wei, J., Xu, Y., You, C. (2025). PosterGen: Aesthetic-Aware Multi-Modal Paper-to-Poster Generation via Multi-Agent LLMs. arXiv:2508.17188, preprint. https://arxiv.org/abs/2508.17188 (VLM rubric for balance, readability, coherence)
- **zhang2026beyondpixel**: Zhang, L., Le, B., Zhao, P., Akhtar, N. (2026). Beyond Pixel Diffs: Benchmarking Image Change Captioning for Web UI Visual Regression Testing. arXiv:2607.01728, preprint. https://arxiv.org/abs/2607.01728 (visual regression, pixel comparison struggles with rendering noise per the abstract)
- **pool2023metatesting**: Pool, J. R. (2023). Accessibility Metatesting: Comparing Nine Testing Tools. 20th International Web for All Conference (W4A 2023), DOI 10.1145/3587281.3587282. https://doi.org/10.1145/3587281.3587282 (Crossref record opened, ACM DL page returned 403. Compares nine tools including axe-core. Coverage numbers I saw came from a third-party review page, so do not quote them without the PDF.)
- **aljedaani2026llmweba11y**: Aljedaani, W., Mollik, R. H. (2026). Large Language Models for Web Accessibility: A Systematic Literature Review. W4A 2026, arXiv:2605.13873. https://arxiv.org/abs/2605.13873 (38 studies, mostly alt text and violation detection)

## Gaps worth saying

- I found no paper that runs a deterministic pixel check against a VLM director inside a design loop and measures what the builder fixes. That is the gap this paper sits in, but it is a statement about my search, so phrase it as "we did not find".
- I found no peer-reviewed study of axe-core or contrast checking on LLM-generated pages. Calò et al. is the nearest and it does not name axe-core.
- Visual regression testing: only the 2026 preprint above surfaced as a research paper. Visual regression tooling is mostly vendor and practitioner material, so lean on Walsh et al. for the software-testing lineage.
- Venue notes: Self-Refine and Reflexion are cited as NeurIPS 2023 on their proceedings pages. Zheng et al. is the Datasets and Benchmarks Track. CRITIC's ICLR 2024 label comes from the arXiv listing only, I did not open an ICLR page for it. Rahmanzadehgervi's ACCV 2024 label comes from a search listing, the CVF page itself returned 403.
